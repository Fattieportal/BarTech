'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState(1); // 1: Date, 2: Time, 3: Details
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]); // Track booked time slots
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  if (!isOpen) return null;

  // Generate next 14 days (including weekends)
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Check if this date has any available time slots
      const timeSlots = getTimeSlots(date);
      const hasAvailableSlots = timeSlots.some(slot => !slot.disabled);
      
      // Only add the date if it has at least one available slot
      if (hasAvailableSlots) {
        dates.push(date);
      }
    }
    return dates;
  };

  // Generate time slots based on selected day
  const getTimeSlots = (date: Date | null) => {
    if (!date) return [];
    
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const slots = [];
    
    // Get current date and time
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    
    // Monday (1) and Wednesday (3): 18:00 - 22:00
    if (dayOfWeek === 1 || dayOfWeek === 3) {
      for (let hour = 18; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (hour === 22 && minute > 0) break; // Stop at 22:00
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          
          // Create a Date object for this timeslot
          const slotDateTime = new Date(date);
          slotDateTime.setHours(hour, minute, 0, 0);
          
          // Check if this slot is within 1 hour from now
          const isWithinOneHour = slotDateTime <= oneHourFromNow;
          
          // Check if this slot is already booked
          const isBooked = bookedSlots.includes(timeString);
          
          // Slot is disabled if within 1 hour OR already booked
          slots.push({ time: timeString, disabled: isWithinOneHour || isBooked });
        }
      }
    }
    // Tuesday (2) and Thursday (4): 10:00 - 18:00 (skip 9:00, 9:30)
    else if (dayOfWeek === 2 || dayOfWeek === 4) {
      for (let hour = 10; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (hour === 18 && minute > 0) break; // Stop at 18:00
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          
          // Create a Date object for this timeslot
          const slotDateTime = new Date(date);
          slotDateTime.setHours(hour, minute, 0, 0);
          
          // Check if this slot is within 1 hour from now
          const isWithinOneHour = slotDateTime <= oneHourFromNow;
          
          // Check if this slot is already booked
          const isBooked = bookedSlots.includes(timeString);
          
          // Slot is disabled if within 1 hour OR already booked
          slots.push({ time: timeString, disabled: isWithinOneHour || isBooked });
        }
      }
    }
    // All other days (Friday, Saturday, Sunday): 9:00 - 18:00
    else {
      for (let hour = 9; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (hour === 18 && minute > 0) break; // Stop at 18:00
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          
          // Create a Date object for this timeslot
          const slotDateTime = new Date(date);
          slotDateTime.setHours(hour, minute, 0, 0);
          
          // Check if this slot is within 1 hour from now
          const isWithinOneHour = slotDateTime <= oneHourFromNow;
          
          // Check if this slot is already booked
          const isBooked = bookedSlots.includes(timeString);
          
          // Slot is disabled if within 1 hour OR already booked
          slots.push({ time: timeString, disabled: isWithinOneHour || isBooked });
        }
      }
    }
    
    return slots;
  };

  const formatDate = (date: Date) => {
    const days = language === 'nl' 
      ? ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = language === 'nl'
      ? ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    // Fetch booked slots for this date
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    fetch(`/api/check-availability?date=${dateString}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.bookedSlots) {
          setBookedSlots(data.bookedSlots);
        }
      })
      .catch(error => {
        console.error('Failed to fetch booked slots:', error);
        // Continue with empty booked slots on error
        setBookedSlots([]);
      });
    
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          ...formData,
          language,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || (language === 'nl' 
            ? '✅ Afspraak succesvol ingepland! Check je email voor de bevestiging.'
            : '✅ Appointment successfully scheduled! Check your email for confirmation.')
        });
        
        // Close modal and reset after 3 seconds
        setTimeout(() => {
          onClose();
          resetForm();
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || (language === 'nl'
            ? 'Er is een fout opgetreden. Probeer het opnieuw.'
            : 'An error occurred. Please try again.')
        });
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: language === 'nl'
          ? 'Er is een fout opgetreden. Neem direct contact op via WhatsApp.'
          : 'An error occurred. Please contact us directly via WhatsApp.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime('');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSubmitStatus({ type: null, message: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {language === 'nl' ? 'Gratis Technisch Adviesgesprek' : 'Free Technical Consultation'}
              </h2>
              <p className="text-blue-100">
                {language === 'nl' ? '30 minuten • Geen verplichtingen' : '30 minutes • No obligations'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2 mt-6">
            <div className={`flex-1 h-1 rounded ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`flex-1 h-1 rounded ${step >= 3 ? 'bg-white' : 'bg-white/30'}`} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Select Date */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === 'nl' ? 'Kies een datum' : 'Choose a date'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {getAvailableDates().map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-center"
                  >
                    <div className="font-bold text-gray-900">{formatDate(date)}</div>
                    <div className="text-sm text-gray-600">{date.getFullYear()}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Time */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {language === 'nl' ? 'Andere datum' : 'Different date'}
              </button>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'nl' ? 'Kies een tijdstip' : 'Choose a time'}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedDate && formatDate(selectedDate)}
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {getTimeSlots(selectedDate).map((slot) => {
                  // Determine the reason for disabled state
                  const now = new Date();
                  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
                  const slotDateTime = selectedDate ? new Date(selectedDate) : new Date();
                  const [hours, minutes] = slot.time.split(':').map(Number);
                  slotDateTime.setHours(hours, minutes, 0, 0);
                  const isWithinOneHour = slotDateTime <= oneHourFromNow;
                  const isBooked = bookedSlots.includes(slot.time);
                  
                  let tooltipText = '';
                  if (isBooked) {
                    tooltipText = language === 'nl' ? 'Al geboekt' : 'Already booked';
                  } else if (isWithinOneHour) {
                    tooltipText = language === 'nl' ? 'Binnen 1 uur (niet beschikbaar)' : 'Within 1 hour (not available)';
                  }
                  
                  return (
                    <button
                      key={slot.time}
                      onClick={() => !slot.disabled && handleTimeSelect(slot.time)}
                      disabled={slot.disabled}
                      className={`p-3 border-2 rounded-lg font-semibold transition-all ${
                        slot.disabled
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-200 text-gray-900 hover:border-blue-600 hover:bg-blue-50'
                      }`}
                      title={tooltipText}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div>
              <button
                onClick={() => setStep(2)}
                className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {language === 'nl' ? 'Andere tijd' : 'Different time'}
              </button>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'nl' ? 'Jouw gegevens' : 'Your details'}
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 text-blue-800">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">
                    {selectedDate && formatDate(selectedDate)} • {selectedTime}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Status Messages */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 border-2 border-green-200 text-green-800' 
                      : 'bg-red-50 border-2 border-red-200 text-red-800'
                  }`}>
                    <p className="font-semibold">{submitStatus.message}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {language === 'nl' ? 'Naam' : 'Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none disabled:bg-gray-100"
                    placeholder={language === 'nl' ? 'Je naam' : 'Your name'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none disabled:bg-gray-100"
                    placeholder="je@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {language === 'nl' ? 'Telefoon' : 'Phone'} *
                  </label>
                  <input
                    type="tel"
                    required
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none disabled:bg-gray-100"
                    placeholder="+31 6 12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {language === 'nl' ? 'Vertel kort over je project' : 'Brief project description'} ({language === 'nl' ? 'optioneel' : 'optional'})
                  </label>
                  <textarea
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none resize-none disabled:bg-gray-100"
                    placeholder={language === 'nl' ? 'Waar kan ik je mee helpen?' : 'What can I help you with?'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {language === 'nl' ? 'Versturen...' : 'Submitting...'}
                    </>
                  ) : (
                    language === 'nl' ? 'Bevestig Afspraak' : 'Confirm Appointment'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
