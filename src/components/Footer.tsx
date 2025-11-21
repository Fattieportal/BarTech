'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              Bar Technology
            </div>
            <p className="text-gray-400 max-w-md mb-4">
              {t.footer.description}
            </p>
            <p className="text-gray-400">
              📍 {t.footer.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.services}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#wordpress" className="hover:text-blue-400 transition-colors">
                  {t.footer.service1}
                </Link>
              </li>
              <li>
                <Link href="/services#api" className="hover:text-blue-400 transition-colors">
                  {t.footer.service2}
                </Link>
              </li>
              <li>
                <Link href="/services#automation" className="hover:text-blue-400 transition-colors">
                  {t.footer.service3}
                </Link>
              </li>
              <li>
                <Link href="/services#webapp" className="hover:text-blue-400 transition-colors">
                  {t.footer.service4}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Bar Technology. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a 
              href="https://www.linkedin.com/in/aimane-e-a33a3a16a/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
