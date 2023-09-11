import fs from 'fs';
import RSS from 'rss';
import { Post } from '@/types/supabase';

export default async function generateRssFeed(posts: Post[]) {
  const siteURL =
    process.env.NODE_ENV === 'production' ? 'https://ev-charge.kr' : 'http://localhost:3000';

  const feedOptions = {
    title: '전기차G 블로그 | RSS 피드',
    description: '전기차와 관련된 유용한 정보를 알려드립니다.',
    site_url: siteURL,
    feed_url: `${siteURL}/rss.xml`,
    pubDate: new Date(),
    image_url: `${siteURL}/logo.png`,
  };

  const feed = new RSS(feedOptions);

  posts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteURL}/blog/${post.slug}`,
      date: new Date(post.created_at),
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
