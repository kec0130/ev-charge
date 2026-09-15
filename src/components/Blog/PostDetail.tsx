import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Post } from 'contentlayer/generated';
import type { PostSummary } from '@/types/blog';
import { formatPostDate, getPostCategory } from '@/utils/blog';
import Icon from '../Common/Icon';
import { MapGuideCard } from '../Common/GuideSidebar';
import BlogInarticleAds from '../Common/AdSense/BlogInarticleAds';
import Mdx from './Mdx';

export default function PostDetail({
  post,
  relatedPosts,
}: {
  post: Post;
  relatedPosts: PostSummary[];
}) {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState('');
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('.mdx-prose h2[id], .mdx-prose h3[id]'),
    ).filter((node) => !['목차', 'intro'].includes(node.id));
    setHeadings(nodes.map((node) => ({ id: node.id, text: node.textContent || '' })));
    setActive(nodes[0]?.id || '');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [post.slug]);
  const toc = (
    <ol className='toc-list'>
      {headings.map((heading, i) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={active === heading.id ? 'active' : ''}
            onClick={() => setActive(heading.id)}
          >
            <span>{i + 1}</span>
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
  const minutes = Math.max(1, Math.ceil(post.body.raw.replace(/<[^>]*>/g, '').length / 650));
  return (
    <div className='article-layout'>
      <div>
        <nav className='breadcrumb' aria-label='현재 위치'>
          <Link href='/blog'>블로그</Link>
          <span>/</span>
          <span>{getPostCategory(post)}</span>
        </nav>
        <div className='post-tags'>
          <span className='tag'>{getPostCategory(post)}</span>
        </div>
        <h1 className='article-title'>{post.title}</h1>
        <p className='article-meta'>
          작성 <time dateTime={post.created_at}>{formatPostDate(post.created_at)}</time> · {minutes}
          분 읽기
        </p>
        <p className='article-notice'>
          작성 시점의 정보입니다. 가격·지원 제도·이용 조건은 현재와 다를 수 있습니다.
        </p>
        <section className='article-summary'>
          <h2>이 글에서 알아볼 내용</h2>
          <p>{post.description}</p>
        </section>
        <BlogInarticleAds key={`${post.slug}-top`} placement='top' />
        {headings.length > 0 && (
          <details className='mobile-toc'>
            <summary>목차 · {headings.length}개 항목</summary>
            {toc}
          </details>
        )}
        <Mdx key={post.slug} code={post.body.code} />
        <div className='article-mobile-guide'>
          <MapGuideCard />
        </div>
        <BlogInarticleAds key={`${post.slug}-bottom`} placement='bottom' />
        <Link href='/blog' className='article-back'>
          <Icon name='back' size={17} />
          블로그 목록으로
        </Link>
      </div>
      <aside className='article-sidebar'>
        {headings.length > 0 && (
          <section className='aside-card'>
            <h2>이 글에서 알아볼 내용</h2>
            {toc}
          </section>
        )}
        <MapGuideCard />
        <section className='aside-card related-links'>
          <h2>함께 읽으면 좋은 글</h2>
          {relatedPosts.map((related) => (
            <Link key={related.slug} href={`/blog/${related.slug}`}>
              <Icon name='document' size={17} />
              {related.title}
              <Icon name='chevron' size={14} />
            </Link>
          ))}
        </section>
      </aside>
    </div>
  );
}
