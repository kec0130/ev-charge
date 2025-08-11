import type { NextApiRequest, NextApiResponse } from 'next';
import { allPosts } from 'contentlayer/generated';
import { generateDateStrings } from '@/utils/usedCars';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL}/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
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
    ${generateDateStrings()
      .map(
        (date) =>
          `<url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL}/used-cars/${date}</loc>
        <lastmod>${new Date(date).toISOString()}</lastmod>
      </url>`
      )
      .join('')}
    </urlset>`;

  res.end(xml);
}
