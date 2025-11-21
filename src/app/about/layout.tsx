import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over Mij | Full-Stack Software Engineer',
  description: 'Ervaren full-stack software engineer gespecialiseerd in WordPress, React, Next.js en API integraties. Ik bouw schaalbare software oplossingen voor bedrijven.',
  alternates: {
    canonical: 'https://bar-technology.nl/about',
  },
  openGraph: {
    title: 'Over Mij | Full-Stack Software Engineer | Bar Technology',
    description: 'Ervaren full-stack software engineer met passie voor schaalbare oplossingen.',
    type: 'profile',
    url: 'https://bar-technology.nl/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Over Mij | Full-Stack Software Engineer | Bar Technology',
    description: 'Ervaren full-stack software engineer met passie voor schaalbare oplossingen.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
