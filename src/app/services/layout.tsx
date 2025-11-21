import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diensten | Professionele Software Development Services',
  description: 'Custom WordPress plugins, API integraties, WooCommerce oplossingen en full-stack web applicaties. Professionele software development op maat voor jouw bedrijf.',
  alternates: {
    canonical: 'https://bar-technology.nl/services',
  },
  openGraph: {
    title: 'Professionele Software Development Services | Bar Technology',
    description: 'Custom WordPress plugins, API integraties en full-stack web applicaties op maat.',
    type: 'website',
    url: 'https://bar-technology.nl/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professionele Software Development Services | Bar Technology',
    description: 'Custom WordPress plugins, API integraties en full-stack web applicaties op maat.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
