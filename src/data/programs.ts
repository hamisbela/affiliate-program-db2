export interface AffiliateProgram {
  id: string;
  name: string;
  category: string;
  commission: string;
  cookieDuration: string;
  commissionType: 'Recurring' | 'One Time';
  signupLink: string;
  platform: string;
  description: string;
  logo: string;
  sponsored?: boolean;
}

export const programs: AffiliateProgram[] = [
  {
    id: '1',
    name: 'ClickFunnels',
    category: 'Marketing Software',
    commission: '40%',
    cookieDuration: '45 days',
    commissionType: 'Recurring',
    signupLink: 'https://clickfunnels.com/affiliates',
    platform: 'In-house',
    description: 'All-in-one sales funnel and marketing automation platform',
    logo: '/images/clickfunnels.png',
    sponsored: true
  },
  {
    id: '2',
    name: 'Kajabi',
    category: 'Course Platform',
    commission: '30%',
    cookieDuration: '30 days',
    commissionType: 'Recurring',
    signupLink: 'https://kajabi.com/partners',
    platform: 'Impact',
    description: 'Complete platform for creating and selling online courses',
    logo: '/images/kajabi.png'
  },
  {
    id: '3',
    name: 'Shopify',
    category: 'E-commerce',
    commission: '$2000 per Plus referral',
    cookieDuration: '30 days',
    commissionType: 'One Time',
    signupLink: 'https://shopify.com/partners',
    platform: 'In-house',
    description: 'Leading e-commerce platform for online stores',
    logo: '/images/shopify.png',
    sponsored: true
  },
  {
    id: '4',
    name: 'HubSpot',
    category: 'CRM',
    commission: '15%',
    cookieDuration: '90 days',
    commissionType: 'Recurring',
    signupLink: 'https://hubspot.com/partners',
    platform: 'Impact',
    description: 'Comprehensive CRM and marketing automation software',
    logo: '/images/hubspot.png'
  }
];