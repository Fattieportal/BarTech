'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'wordpress',
      title: t.services.service1.title,
      description: t.services.service1.description,
      features: t.services.service1.features,
      price: t.services.service1.price,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      featured: true,
    },
    {
      id: 'api',
      title: t.services.service2.title,
      description: t.services.service2.description,
      features: t.services.service2.features,
      price: t.services.service2.price,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      featured: false,
    },
    {
      id: 'automation',
      title: t.services.service3.title,
      description: t.services.service3.description,
      features: t.services.service3.features,
      price: t.services.service3.price,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      featured: false,
    },
    {
      id: 'webapp',
      title: t.services.service4.title,
      description: t.services.service4.description,
      features: t.services.service4.features,
      price: t.services.service4.price,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      featured: false,
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.services.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            {t.services.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                id={service.id}
                className={`p-8 rounded-2xl shadow-lg scroll-mt-24 ${
                  service.featured
                    ? 'md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-400 transition-colors'
                }`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      service.featured
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h2
                      className={`text-2xl md:text-3xl font-bold mb-3 ${
                        service.featured ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {service.title}
                    </h2>
                    <p
                      className={`text-lg mb-6 ${
                        service.featured ? 'text-blue-100' : 'text-gray-600'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`flex items-start gap-2 ${
                        service.featured ? 'text-blue-100' : 'text-gray-700'
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          service.featured ? 'text-green-300' : 'text-blue-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <p
                    className={`text-xl font-bold ${
                      service.featured ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {service.price}
                  </p>
                  <Link
                    href="/contact"
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      service.featured
                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {t.nav.getStarted}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.services.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t.services.cta.subtitle}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t.services.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
