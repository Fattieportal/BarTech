import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  path,
  image = '/og-image.jpg',
  type = 'website',
  keywords = [],
}: SEOProps): Metadata {
  const baseUrl = 'https://bartech.nl'; // Update later naar je domein
  const url = `${baseUrl}${path}`;

  const defaultKeywords = [
    'full-stack developer',
    'software engineer',
    'WordPress development',
    'API integration',
    'web development Nederland',
    'custom plugins',
    'automation systems',
  ];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: 'BarTech' }],
    creator: 'BarTech',
    publisher: 'BarTech',
    
    // Open Graph
    openGraph: {
      type,
      locale: 'nl_NL',
      url,
      title,
      description,
      siteName: 'BarTech',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${image}`],
      creator: '@bartech', // Update naar je Twitter handle
    },

    // Canonical URL
    alternates: {
      canonical: url,
      languages: {
        'nl-NL': url,
        'en-US': url.replace('/nl/', '/en/'), // Als je later Engels toevoegt
      },
    },

    // Additional metadata
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

    // Verification (voeg later toe als je Google Search Console hebt)
    // verification: {
    //   google: 'your-google-verification-code',
    // },
  };
}
