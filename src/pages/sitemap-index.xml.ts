import type { APIRoute } from 'astro';
import { generateSitemapPages, chunkArray, createSitemapIndex } from '../utils/sitemap';

const baseUrl = 'https://affiliateprogramdb.xyz';

export const GET: APIRoute = async () => {
  const pages = generateSitemapPages(baseUrl);
  const pageChunks = chunkArray(pages, 200);
  const sitemapIndexXML = createSitemapIndex(baseUrl, pageChunks.length);

  return new Response(sitemapIndexXML, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};