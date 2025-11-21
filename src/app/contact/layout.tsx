import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Start Je Software Project',
  description: 'Neem contact op voor een gratis adviesgesprek over je software project. WordPress development, API integraties, web applicaties en meer.',
  alternates: {
    canonical: 'https://bar-technology.nl/contact',
  },
  openGraph: {
    title: 'Contact | Start Je Software Project | Bar Technology',
    description: 'Neem contact op voor een gratis adviesgesprek over je software project.',
    type: 'website',
    url: 'https://bar-technology.nl/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Start Je Software Project | Bar Technology',
    description: 'Neem contact op voor een gratis adviesgesprek over je software project.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
