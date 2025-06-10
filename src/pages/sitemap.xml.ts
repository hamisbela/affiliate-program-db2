import type { APIRoute } from 'astro';
import { generateSitemapPages, createSitemapXML, chunkArray } from '../utils/sitemap';

const baseUrl = 'https://affiliateprogramdb.xyz';

export const GET: APIRoute = async () => {
  const pages = generateSitemapPages(baseUrl);
  const sitemapXML = createSitemapXML(pages);

  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};