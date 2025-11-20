'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Comparison() {
  const { t } = useLanguage();

  const comparisonData = [
    {
      criteria: t.comparison.criteria.price,
      bartech: { rating: 'good', text: '€€' },
      freelance: { rating: 'excellent', text: '€' },
      agency: { rating: 'poor', text: '€€€€' },
    },
    {
      criteria: t.comparison.criteria.quality,
      bartech: { rating: 'excellent', text: t.comparison.ratings.excellent },
      freelance: { rating: 'average', text: t.comparison.ratings.average },
      agency: { rating: 'good', text: t.comparison.ratings.good },
    },
    {
      criteria: t.comparison.criteria.communication,
      bartech: { rating: 'excellent', text: t.comparison.ratings.excellent },
      freelance: { rating: 'average', text: t.comparison.ratings.average },
      agency: { rating: 'good', text: t.comparison.ratings.good },
    },
    {
      criteria: t.comparison.criteria.speed,
      bartech: { rating: 'excellent', text: '2-4 weken' },
      freelance: { rating: 'good', text: '3-6 weken' },
      agency: { rating: 'average', text: '8-12 weken' },
    },
    {
      criteria: t.comparison.criteria.support,
      bartech: { rating: 'excellent', text: t.comparison.ratings.excellent },
      freelance: { rating: 'poor', text: t.comparison.ratings.poor },
      agency: { rating: 'good', text: t.comparison.ratings.good },
    },
    {
      criteria: t.comparison.criteria.flexibility,
      bartech: { rating: 'excellent', text: t.comparison.ratings.excellent },
      freelance: { rating: 'good', text: t.comparison.ratings.good },
      agency: { rating: 'average', text: t.comparison.ratings.average },
    },
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'average':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.comparison.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.comparison.subtitle}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header */}
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-4 text-left font-bold text-gray-900"></th>
                <th className="py-4 px-4 text-center">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 py-3 rounded-lg font-bold shadow-lg">
                    ⭐ {t.comparison.bartech}
                  </div>
                </th>
                <th className="py-4 px-4 text-center font-semibold text-gray-700">
                  {t.comparison.freelancePlatform}
                </th>
                <th className="py-4 px-4 text-center font-semibold text-gray-700">
                  {t.comparison.agency}
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 font-semibold text-gray-900">
                    {row.criteria}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(row.bartech.rating)}`}>
                      {row.bartech.text}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(row.freelance.rating)}`}>
                      {row.freelance.text}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(row.agency.rating)}`}>
                      {row.agency.text}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-100 border-2 border-green-800"></span>
            <span className="text-gray-600">{t.comparison.ratings.excellent}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-800"></span>
            <span className="text-gray-600">{t.comparison.ratings.good}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-yellow-100 border-2 border-yellow-800"></span>
            <span className="text-gray-600">{t.comparison.ratings.average}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-100 border-2 border-red-800"></span>
            <span className="text-gray-600">{t.comparison.ratings.poor}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
