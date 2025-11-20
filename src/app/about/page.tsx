'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.about.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            {t.about.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Intro with Photo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl ring-8 ring-blue-50">
                <Image 
                  src="/images/Aimane KPMG.jpg" 
                  alt="Aimane Elbarjaj - Tech Consultant"
                  fill
                  className="object-cover object-top"
                  priority
                  style={{ objectPosition: '50% 20%' }}
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t.about.intro.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t.about.intro.description}
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t.about.experience.title}
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Job 1 */}
              <div className="relative pl-8 pb-8 border-l-4 border-blue-600">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full"></div>
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.about.experience.job1.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {t.about.experience.job1.company} • {t.about.experience.job1.period}
                  </p>
                  <p className="text-gray-600">
                    {t.about.experience.job1.description}
                  </p>
                </div>
              </div>

              {/* Job 2 */}
              <div className="relative pl-8 pb-8 border-l-4 border-blue-400">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-400 rounded-full"></div>
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.about.experience.job2.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {t.about.experience.job2.company} • {t.about.experience.job2.period}
                  </p>
                  <p className="text-gray-600">
                    {t.about.experience.job2.description}
                  </p>
                </div>
              </div>

              {/* Job 3 */}
              <div className="relative pl-8 pb-8 border-l-4 border-blue-400">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-400 rounded-full"></div>
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.about.experience.job3.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {t.about.experience.job3.company} • {t.about.experience.job3.period}
                  </p>
                  <p className="text-gray-600">
                    {t.about.experience.job3.description}
                  </p>
                </div>
              </div>

              {/* Job 4 */}
              <div className="relative pl-8 pb-8 border-l-4 border-gray-400">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-400 rounded-full"></div>
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.about.experience.job4.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {t.about.experience.job4.company} • {t.about.experience.job4.period}
                  </p>
                  <p className="text-gray-600">
                    {t.about.experience.job4.description}
                  </p>
                </div>
              </div>

              {/* Job 5 */}
              <div className="relative pl-8 border-l-4 border-gray-400">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-400 rounded-full"></div>
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.about.experience.job5.title}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {t.about.experience.job5.company} • {t.about.experience.job5.period}
                  </p>
                  <p className="text-gray-600">
                    {t.about.experience.job5.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t.about.education.title}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-md border-2 border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.about.education.degree1.title}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {t.about.education.degree1.school}
                </p>
                <p className="text-gray-600">
                  {t.about.education.degree1.description}
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl shadow-md border-2 border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.about.education.cert1.title}
                </h3>
                <p className="text-green-600 font-semibold mb-2">
                  {t.about.education.cert1.school}
                </p>
                <p className="text-gray-600">
                  {t.about.education.cert1.description}
                </p>
              </div>
            </div>
          </div>

          {/* Skills/Technologies */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t.about.skills.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 transition-colors">
                <h3 className="font-bold text-xl text-gray-900 mb-4">{t.about.skills.backend.title}</h3>
                <ul className="text-gray-600 space-y-2">
                  {t.about.skills.backend.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 transition-colors">
                <h3 className="font-bold text-xl text-gray-900 mb-4">{t.about.skills.frontend.title}</h3>
                <ul className="text-gray-600 space-y-2">
                  {t.about.skills.frontend.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 transition-colors">
                <h3 className="font-bold text-xl text-gray-900 mb-4">{t.about.skills.tools.title}</h3>
                <ul className="text-gray-600 space-y-2">
                  {t.about.skills.tools.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* How I Work */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t.about.approach.title}
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.about.approach.point1.title}</h3>
                  <p className="text-gray-600">
                    {t.about.approach.point1.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.about.approach.point2.title}</h3>
                  <p className="text-gray-600">
                    {t.about.approach.point2.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.about.approach.point3.title}</h3>
                  <p className="text-gray-600">
                    {t.about.approach.point3.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.about.approach.point4.title}</h3>
                  <p className="text-gray-600">
                    {t.about.approach.point4.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.about.projects.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.about.projects.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.about.projects.project1.title}
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">
                  {t.about.projects.project1.client}
                </p>
                <p className="text-gray-600 mb-4">
                  {t.about.projects.project1.description}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Technologieën:</p>
                <div className="flex flex-wrap gap-2">
                  {t.about.projects.project1.technologies.map((tech: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-green-600">
                  ✓ {t.about.projects.project1.result}
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.about.projects.project2.title}
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">
                  {t.about.projects.project2.client}
                </p>
                <p className="text-gray-600 mb-4">
                  {t.about.projects.project2.description}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Technologieën:</p>
                <div className="flex flex-wrap gap-2">
                  {t.about.projects.project2.technologies.map((tech: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-green-600">
                  ✓ {t.about.projects.project2.result}
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.about.projects.project3.title}
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">
                  {t.about.projects.project3.client}
                </p>
                <p className="text-gray-600 mb-4">
                  {t.about.projects.project3.description}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Technologieën:</p>
                <div className="flex flex-wrap gap-2">
                  {t.about.projects.project3.technologies.map((tech: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-green-600">
                  ✓ {t.about.projects.project3.result}
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.about.projects.project4.title}
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-4">
                  {t.about.projects.project4.client}
                </p>
                <p className="text-gray-600 mb-4">
                  {t.about.projects.project4.description}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Technologieën:</p>
                <div className="flex flex-wrap gap-2">
                  {t.about.projects.project4.technologies.map((tech: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-green-600">
                  ✓ {t.about.projects.project4.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.about.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t.about.cta.subtitle}
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t.about.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
