'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Challenge() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.challenge.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.challenge.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Pain Point 1 */}
          <div className="p-8 bg-red-50 border-2 border-red-100 rounded-xl">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.challenge.pain1.title}
            </h3>
            <p className="text-gray-600">
              {t.challenge.pain1.description}
            </p>
          </div>

          {/* Pain Point 2 */}
          <div className="p-8 bg-red-50 border-2 border-red-100 rounded-xl">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.challenge.pain2.title}
            </h3>
            <p className="text-gray-600">
              {t.challenge.pain2.description}
            </p>
          </div>

          {/* Pain Point 3 */}
          <div className="p-8 bg-red-50 border-2 border-red-100 rounded-xl">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.challenge.pain3.title}
            </h3>
            <p className="text-gray-600">
              {t.challenge.pain3.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
