'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import CTA from '@/components/CTA';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Contact() {
  const { t, language } = useLanguage();
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

  // WhatsApp handler met device detection
  const handleWhatsAppClick = () => {
    const phoneNumber = '31685498990'; // WhatsApp nummer
    const message = encodeURIComponent(t.contact.info.whatsappMessage);
    
    // Device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // WhatsApp URL (mobiel gebruikt api.whatsapp.com, desktop gebruikt web.whatsapp.com)
    const whatsappUrl = isMobile 
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || (language === 'nl' 
            ? '✅ Bedankt voor je bericht! We nemen zo snel mogelijk contact op.'
            : '✅ Thank you for your message! We will contact you as soon as possible.')
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || (language === 'nl'
            ? 'Er is een fout opgetreden. Probeer het opnieuw of neem contact op via WhatsApp.'
            : 'An error occurred. Please try again or contact us via WhatsApp.')
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="pt-20">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.contact.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            {t.contact.hero.subtitle}
          </p>
        </div>
      </section>

      {/* CTA Section - Direct na hero */}
      <CTA hideWhatsApp={true} compact={true} />

      {/* Contact Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                {t.contact.form.name} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors disabled:bg-gray-100"
                placeholder={t.contact.form.namePlaceholder}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                {t.contact.form.email} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors disabled:bg-gray-100"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                {language === 'nl' ? 'Telefoon (optioneel)' : 'Phone (optional)'}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                disabled={isSubmitting}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors disabled:bg-gray-100"
                placeholder="+31 6 12345678"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                {t.contact.form.message} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                disabled={isSubmitting}
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors resize-none disabled:bg-gray-100"
                placeholder={t.contact.form.messagePlaceholder}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'nl' ? 'Versturen...' : 'Sending...'}
                  </>
                ) : (
                  t.contact.form.submit
                )}
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  {language === 'nl' ? 'of' : 'or'}
                </span>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {language === 'nl' ? 'Start WhatsApp Chat' : 'Start WhatsApp Chat'}
              </button>
              <p className="text-center text-sm text-gray-500 mt-2">
                {language === 'nl' ? 'Direct contact via WhatsApp' : 'Direct contact via WhatsApp'}
              </p>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.contact.info.email}</h3>
              <a href={`mailto:${t.contact.info.emailValue}`} className="text-blue-600 hover:underline">
                {t.contact.info.emailValue}
              </a>
            </div>

            {/* Location */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.contact.info.location}</h3>
              <p className="text-gray-600">{t.contact.info.locationValue}</p>
            </div>

            {/* Availability */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.contact.info.availability}</h3>
              <p className="text-gray-600">{t.contact.info.availabilityValue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.faq.title}?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t.faq.subtitle}
          </p>
          <Link 
            href="/#faq" 
            className="inline-block px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
          >
            {t.faq.title}
          </Link>
        </div>
      </section>
    </main>
  );
}
