import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Post } from '@/types/supabase';
import { getAllPosts } from '@/services/blog';
import generateRssFeed from '@/utils/rss';
import Metadata from '@/components/Common/Metadata';
import Status from '@/components/Common/Status';
import PostList from '@/components/Blog/PostList';

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (posts.length === 0) {
    return <Status type='error' text='게시글 목록을 불러올 수 없습니다.' fullHeight />;
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

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const { posts } = await getAllPosts();
  const sortedPosts = posts.slice(1, posts.length).sort((a, b) => (a.id > b.id ? -1 : 1));
  const newPosts = [posts[0], ...sortedPosts];
  generateRssFeed(posts);

  return {
    props: {
      posts: newPosts,
    },
  };
};

export default Blog;
