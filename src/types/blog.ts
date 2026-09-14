import type { Post } from 'contentlayer/generated';

export type PostSummary = Pick<Post, 'title' | 'description' | 'slug' | 'image_url' | 'created_at'>;

export function toPostSummary(post: Post): PostSummary {
  return {
    title: post.title,
    description: post.description,
    slug: post.slug,
    image_url: post.image_url,
    created_at: post.created_at,
  };
}
