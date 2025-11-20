import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bartech.nl'), // Update later naar je domein
  title: {
    default: "Full-Stack Software Engineer | Custom WordPress & Web Development",
    template: "%s | BarTech",
  },
  description: "Full-stack software engineer specializing in custom WordPress plugins, API integrations, automation systems, and scalable web applications. Based in the Netherlands.",
  keywords: [
    'full-stack developer',
    'software engineer',
    'WordPress development',
    'API integration',
    'web development Nederland',
    'custom plugins',
    'automation systems',
    'Next.js development',
    'React developer',
  ],
  authors: [{ name: 'BarTech' }],
  creator: 'BarTech',
  publisher: 'BarTech',
  
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://bartech.nl',
    title: 'Full-Stack Software Engineer | Custom WordPress & Web Development',
    description: 'Full-stack software engineer specializing in custom WordPress plugins, API integrations, automation systems, and scalable web applications.',
    siteName: 'BarTech',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BarTech - Full-Stack Software Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Full-Stack Software Engineer | Custom WordPress & Web Development',
    description: 'Full-stack software engineer specializing in custom WordPress plugins, API integrations, and automation systems.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BarTech',
    url: 'https://bartech.nl',
    logo: 'https://bartech.nl/logo.png',
    description: 'Full-stack software engineering services specializing in WordPress, API integrations, and automation.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
      addressLocality: 'Netherlands',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Dutch', 'English'],
    },
    sameAs: [
      // Voeg hier je social media links toe
      // 'https://linkedin.com/in/yourprofile',
      // 'https://github.com/yourprofile',
    ],
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'BarTech Developer',
    jobTitle: 'Full-Stack Software Engineer',
    url: 'https://bartech.nl',
    sameAs: [
      // 'https://linkedin.com/in/yourprofile',
      // 'https://github.com/yourprofile',
    ],
    knowsAbout: [
      'WordPress Development',
      'API Integration',
      'Full-Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'PHP',
      'Automation Systems',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BarTech',
    url: 'https://bartech.nl',
    description: 'Professional full-stack software engineering services',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://bartech.nl/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="nl">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KFYHGBVSQ4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KFYHGBVSQ4');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "u97ii4tm8l");
          `}
        </Script>
        
        <LanguageProvider>
          <Navigation />
          {children}
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
