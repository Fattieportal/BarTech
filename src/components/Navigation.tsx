'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'nl' ? 'en' : 'nl');
  };

  // Sluit menu na klikken op een link
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            BarTech
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t.nav.services}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t.nav.about}
            </Link>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors border-2 border-gray-200 rounded-lg hover:border-blue-200"
              aria-label="Switch language"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-sm font-semibold">{language === 'nl' ? 'EN' : 'NL'}</span>
            </button>

            <Link href="/contact" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors">
              {t.nav.getStarted}
            </Link>
          </div>

          {/* Mobile: Language Toggle (altijd zichtbaar) + Menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors border-2 border-gray-200 rounded-lg hover:border-blue-200"
              aria-label="Switch language"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-xs font-semibold">{language === 'nl' ? 'EN' : 'NL'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={closeMenu}
            >
              {t.nav.home}
            </Link>
            <Link 
              href="/services" 
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={closeMenu}
            >
              {t.nav.services}
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={closeMenu}
            >
              {t.nav.about}
            </Link>

            <Link 
              href="/contact" 
              className="block mx-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
              onClick={closeMenu}
            >
              {t.nav.getStarted}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
