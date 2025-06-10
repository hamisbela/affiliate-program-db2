export interface Category {
  name: string;
  slug: string;
  description: string;
  programCount?: number;
}

export const categories: Category[] = [
  {
    name: 'Marketing Software',
    slug: 'marketing-software',
    description: 'Affiliate programs for marketing automation, email marketing, and other marketing tools',
    programCount: 650
  },
  {
    name: 'Course Platform',
    slug: 'course-platform',
    description: 'Programs for online course creation and learning management systems',
    programCount: 480
  },
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Affiliate programs for e-commerce platforms, tools, and online stores',
    programCount: 1200
  },
  {
    name: 'CRM',
    slug: 'crm',
    description: 'Customer relationship management software affiliate programs',
    programCount: 320
  },
  {
    name: 'Web Hosting',
    slug: 'web-hosting',
    description: 'Hosting providers with competitive commission rates and long cookies',
    programCount: 230
  },
  {
    name: 'Finance',
    slug: 'finance',
    description: 'Financial services, banking, and investment affiliate programs',
    programCount: 560
  },
];