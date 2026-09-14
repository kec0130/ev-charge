import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { allPosts } from 'contentlayer/generated';
import { PostSummary, toPostSummary } from '@/types/blog';

import generateRssFeed from '@/utils/rss';
import Metadata from '@/components/Common/Metadata';
import PostList from '@/components/Blog/PostList';
import ErrorPage from '@/components/Common/ErrorPage';

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (posts.length === 0) {
    return <ErrorPage text='게시글 목록을 불러올 수 없습니다.' />;
  }

  return (
    <>
      <Metadata
        title='블로그'
        description='전기차와 관련된 유용한 정보를 알려드립니다.'
        keywords='전기차 블로그, 전기차 정보, 전기차 팁'
        url='/blog'
      />
      <PostList posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<{ posts: PostSummary[] }> = async () => {
  const posts = [...allPosts].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const introduction = posts.find((post) => post.slug === 'ev-charge-introduction');
  const orderedPosts = introduction
    ? [introduction, ...posts.filter((post) => post.slug !== introduction.slug)]
    : posts;
  await generateRssFeed();

  return {
    props: {
      posts: orderedPosts.map(toPostSummary),
    },
  };
};

export default Blog;
