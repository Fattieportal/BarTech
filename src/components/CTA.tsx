'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import BookingModal from './BookingModal';

interface CTAProps {
  hideWhatsApp?: boolean;
  compact?: boolean;
}

export default function CTA({ hideWhatsApp = false, compact = false }: CTAProps) {
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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

  return (
    <>
      <section className={`px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 ${compact ? 'py-12' : 'py-20'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`font-bold text-white ${compact ? 'text-3xl md:text-4xl mb-4' : 'text-4xl md:text-5xl mb-6'}`}>
            {t.cta.title}
          </h2>
          <p className={`text-blue-100 ${compact ? 'text-lg mb-3' : 'text-xl mb-4'}`}>
            {t.cta.subtitle}
          </p>
          
          {/* Free Offer Badge - Now Clickable */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className={`inline-block px-6 py-3 bg-green-500 text-white rounded-full font-bold shadow-lg hover:bg-green-600 hover:scale-105 transition-all cursor-pointer ${compact ? 'text-base mb-4' : 'text-lg mb-8'}`}
          >
            🎁 {t.cta.freeOffer}
          </button>
          <p className={`text-blue-100 max-w-2xl mx-auto ${compact ? 'text-sm mb-6' : 'mb-8'}`}>
            {t.cta.freeOfferSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* WhatsApp Button - Optioneel */}
            {!hideWhatsApp && (
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 px-6 py-4 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                title="Chat via WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </button>
            )}
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
