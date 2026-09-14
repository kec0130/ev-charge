import { useMemo, useState } from 'react';
import type { PostSummary } from '@/types/blog';
import { BLOG_CATEGORIES, BlogCategory, getPostCategory } from '@/utils/blog';
import Icon from '../Common/Icon';
import GuideSidebar from '../Common/GuideSidebar';
import PostList from './PostList';

const PAGE_SIZE = 6;
export default function BlogHome({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<BlogCategory>('전체');
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () =>
      posts.filter(
        (post) =>
          (category === '전체' || getPostCategory(post) === category) &&
          (post.title + post.description)
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(query.toLowerCase().replace(/\s/g, '')),
      ),
    [posts, query, category],
  );
  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const changePage = (value: number) => {
    setPage(value);
    document.getElementById('blog-results')?.scrollIntoView({ block: 'start' });
  };
  return (
    <>
      <div className='page-heading'>
        <div>
          <h1 className='page-title'>전기차 블로그</h1>
          <p className='page-description'>충전부터 중고차 구매까지, 알아두면 좋은 이야기</p>
        </div>
        <label className='search-field'>
          <Icon name='search' />
          <input
            type='search'
            aria-label='블로그 검색'
            placeholder='궁금한 내용을 검색하세요'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </label>
      </div>
      <div className='category-list' aria-label='글 카테고리'>
        {BLOG_CATEGORIES.map((item) => (
          <button
            key={item}
            className='filter-chip'
            aria-pressed={category === item}
            onClick={() => {
              setCategory(item);
              setPage(1);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className='content-columns'>
        <section id='blog-results' aria-label='게시글 목록' style={{ scrollMarginTop: 96 }}>
          {(query || category !== '전체') && (
            <p className='result-count' role='status'>
              {filtered.length}개의 글을 찾았습니다.
            </p>
          )}
          {filtered.length ? (
            <PostList posts={filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)} />
          ) : (
            <div className='empty-state'>
              <Icon name='search' size={30} />
              <h2>검색 결과가 없습니다</h2>
              <p>다른 검색어나 카테고리로 찾아보세요.</p>
              <button
                className='outline-button'
                onClick={() => {
                  setQuery('');
                  setCategory('전체');
                  setPage(1);
                }}
              >
                전체 글 보기
              </button>
            </div>
          )}
          {pages > 1 && (
            <nav className='pagination' aria-label='게시글 페이지'>
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  aria-label={`${i + 1}페이지`}
                  aria-current={page === i + 1 ? 'page' : undefined}
                  onClick={() => changePage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                aria-label='다음 페이지'
                disabled={page === pages}
                onClick={() => changePage(page + 1)}
              >
                <Icon name='chevron' size={16} />
              </button>
            </nav>
          )}
        </section>
        <GuideSidebar />
      </div>
    </>
  );
}
