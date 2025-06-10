import type { APIRoute, GetStaticPaths } from 'astro';
import { generateSitemapPages, createSitemapXML, chunkArray } from '../utils/sitemap';

const baseUrl = 'https://affiliateprogramdb.xyz';

export const getStaticPaths: GetStaticPaths = () => {
  const pages = generateSitemapPages(baseUrl);
  const pageChunks = chunkArray(pages, 200);
  
  return pageChunks.map((chunk, index) => ({
    params: { index: (index + 1).toString() },
    props: { pages: chunk }
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { pages } = props;
  const sitemapXML = createSitemapXML(pages);

  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};