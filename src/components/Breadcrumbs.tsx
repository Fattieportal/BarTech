'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs from pathname if not provided
  const breadcrumbItems = items || generateBreadcrumbs(pathname);
  
  // Generate schema for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://bar-technology.nl${item.href}`
    }))
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                ) : (
                  <Link href={item.href} className="text-blue-600 hover:text-blue-800 hover:underline">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];
  
  const pathMap: Record<string, string> = {
    'services': 'Diensten',
    'about': 'Over Mij',
    'contact': 'Contact',
    'privacy': 'Privacy',
  };
  
  let currentPath = '';
  paths.forEach(path => {
    currentPath += `/${path}`;
    breadcrumbs.push({
      label: pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1),
      href: currentPath
    });
  });
  
  return breadcrumbs;
}
