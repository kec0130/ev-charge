import fs from 'fs';
import RSS from 'rss';
import { allPosts } from 'contentlayer/generated';

export default async function generateRssFeed() {
  const siteURL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_URL!
      : 'http://localhost:3000';

  const feedOptions = {
    title: '전기차G 블로그 | RSS 피드',
    description: '전기차와 관련된 유용한 정보를 알려드립니다.',
    site_url: siteURL,
    feed_url: `${siteURL}/rss.xml`,
    pubDate: new Date(),
    image_url: `${siteURL}/logo.png`,
  };

  const feed = new RSS(feedOptions);

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteURL}/blog/${post.slug}`,
      date: new Date(post.created_at),
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
