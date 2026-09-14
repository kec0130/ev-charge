import type { PostSummary } from '@/types/blog';
import PostListItem from './PostListItem';
export default function PostList({ posts }: { posts: PostSummary[] }) {
  return (
    <ul className='post-list'>
      {posts.map((post, index) => (
        <PostListItem key={post.slug} post={post} featured={index === 0} />
      ))}
    </ul>
  );
}
