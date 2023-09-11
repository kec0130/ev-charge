import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '@/services/blog';
import { MENU_LIST } from '@/constants/navigation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { posts } = await getAllPosts();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${MENU_LIST.map(
      (menu) =>
        `<url>
        <loc>https://ev-charge.kr${menu.href}</loc>
        <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
      </url>`
    ).join('')}
    ${posts
      .map(
        (post) =>
          `<url>
        <loc>https://ev-charge.kr/blog/${post.slug}</loc>
        <lastmod>${post.created_at}</lastmod>
      </url>`
      )
      .join('')}
    </urlset>`;

  res.end(xml);
}
