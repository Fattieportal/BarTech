'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: t.faq.q1.q, answer: t.faq.q1.a },
    { question: t.faq.q2.q, answer: t.faq.q2.a },
    { question: t.faq.q3.q, answer: t.faq.q3.a },
    { question: t.faq.q4.q, answer: t.faq.q4.a },
    { question: t.faq.q5.q, answer: t.faq.q5.a },
    { question: t.faq.q6.q, answer: t.faq.q6.a },
    { question: t.faq.q7.q, answer: t.faq.q7.a },
    { question: t.faq.q8.q, answer: t.faq.q8.a },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.faq.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
