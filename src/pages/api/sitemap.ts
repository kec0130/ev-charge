import type { NextApiRequest, NextApiResponse } from 'next';
import { allPosts } from 'contentlayer/generated';
import { getUsedCarMonths } from '@/services/usedCars';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let months: string[];
  try {
    months = await getUsedCarMonths();
  } catch {
    return res.status(503).send('Sitemap temporarily unavailable');
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL}</loc>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL}/blog</loc>
      </url>
    ${allPosts
      .map(
        (post) =>
          `<url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}</loc>
        <lastmod>${post.created_at}</lastmod>
      </url>`
      )
      .join('')}
    ${months
      .map(
        (date) =>
          `<url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL}/used-cars/${date}</loc>
      </url>`
      )
      .join('')}
    </urlset>`;

  res.end(xml);
}
