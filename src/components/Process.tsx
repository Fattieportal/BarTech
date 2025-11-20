'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Process() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.process.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.process.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="relative">
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t.process.step1.title}
              </h3>
              <p className="text-gray-600">
                {t.process.step1.description}
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t.process.step2.title}
              </h3>
              <p className="text-gray-600">
                {t.process.step2.description}
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t.process.step3.title}
              </h3>
              <p className="text-gray-600">
                {t.process.step3.description}
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-xl shadow-md border-2 border-gray-100 hover:border-blue-200 transition-all">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl mb-4">
              4
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.process.step4.title}
            </h3>
            <p className="text-gray-600">
              {t.process.step4.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
