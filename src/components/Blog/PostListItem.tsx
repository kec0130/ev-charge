import Link from 'next/link';
import Image from 'next/image';
import type { PostSummary } from '@/types/blog';
import { formatPostDate, getPostCategory } from '@/utils/blog';

export default function PostListItem({
  post,
  featured = false,
}: {
  post: PostSummary;
  featured?: boolean;
}) {
  return (
    <li className={featured ? 'post-card featured' : 'post-card'}>
      <Link href={`/blog/${post.slug}`}>
        <div className='post-thumbnail'>
          <Image src={post.image_url} alt='' width={410} height={294} priority={featured} />
        </div>
        <div className='post-card-copy'>
          <div className='post-tags'>
            <span className='tag'>{getPostCategory(post)}</span>
            {post.slug === 'ev-charge-introduction' && (
              <span className='tag tag-solid'>서비스 안내</span>
            )}
          </div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div className='post-date'>
            <time dateTime={post.created_at}>{formatPostDate(post.created_at)}</time> ·{' '}
            {post.readingMinutes}분 읽기
          </div>
        </div>
      </Link>
    </li>
  );
}
