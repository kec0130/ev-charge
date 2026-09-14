import type { Post } from 'contentlayer/generated';

export type PostSummary = Pick<
  Post,
  'title' | 'description' | 'slug' | 'image_url' | 'created_at'
> & { readingMinutes: number };
export function toPostSummary(post: Post): PostSummary {
  return {
    title: post.title,
    description: post.description,
    slug: post.slug,
    image_url: post.image_url,
    created_at: post.created_at,
    readingMinutes: Math.max(1, Math.ceil(post.body.raw.replace(/<[^>]*>/g, '').length / 650)),
  };
}
