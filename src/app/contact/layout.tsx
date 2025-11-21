import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Start Je Software Project',
  description: 'Neem contact op voor een gratis adviesgesprek over je software project. WordPress development, API integraties, web applicaties en meer.',
  openGraph: {
    title: 'Contact | Start Je Software Project | Bar Technology',
    description: 'Neem contact op voor een gratis adviesgesprek over je software project.',
    type: 'website',
    url: 'https://bar-technology.nl/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
