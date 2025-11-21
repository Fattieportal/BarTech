import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diensten | Professionele Software Development Services',
  description: 'Custom WordPress plugins, API integraties, WooCommerce oplossingen en full-stack web applicaties. Professionele software development op maat voor jouw bedrijf.',
  openGraph: {
    title: 'Professionele Software Development Services | Bar Technology',
    description: 'Custom WordPress plugins, API integraties en full-stack web applicaties op maat.',
    type: 'website',
    url: 'https://bar-technology.nl/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
