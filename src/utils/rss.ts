import fs from 'fs';
import RSS from 'rss';
import { allPosts } from 'contentlayer/generated';

export default async function generateRssFeed() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;
  const posts = [...allPosts].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const latestPost = posts[0];

  const feedOptions = {
    title: '전기차G 블로그 | RSS 피드',
    description: '전기차와 관련된 유용한 정보를 알려드립니다.',
    site_url: baseURL,
    feed_url: `${baseURL}/rss.xml`,
    pubDate: latestPost ? new Date(latestPost.created_at) : undefined,
    image_url: `${baseURL}/logo.png`,
  };

  const feed = new RSS(feedOptions);

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${baseURL}/blog/${post.slug}`,
      date: new Date(post.created_at),
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
