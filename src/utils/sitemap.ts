import { getAllCategories, createSlug } from './csvParser';

export interface SitemapPage {
  url: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

export function generateSitemapPages(baseUrl: string): SitemapPage[] {
  const pages: SitemapPage[] = [];
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' as const },
    { url: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' as const },
    { url: '/database', priority: 0.9, changefreq: 'weekly' as const },
    { url: '/add-listing', priority: 0.6, changefreq: 'monthly' as const }
  ];

  staticPages.forEach(page => {
    pages.push({
      url: `${baseUrl}${page.url}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Category pages
  const categories = getAllCategories();
  categories.forEach(category => {
    const slug = createSlug(category);
    pages.push({
      url: `${baseUrl}/category/${slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  return pages;
}

export function createSitemapXML(pages: SitemapPage[]): string {
  const urlSet = pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlSet}
</urlset>`;
}

export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export function createSitemapIndex(baseUrl: string, sitemapCount: number): string {
  const sitemaps = Array.from({ length: sitemapCount }, (_, i) => `
  <sitemap>
    <loc>${baseUrl}/sitemap-${i + 1}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}