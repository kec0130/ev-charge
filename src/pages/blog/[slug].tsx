import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { Post } from '@/types/supabase';
import { getAllPosts } from '@/services/blog';
import PostDetail from '@/components/Blog/PostDetail';
import Metadata from '@/components/Common/Metadata';
import Status from '@/components/Common/Status';

interface Props {
  post: Post | undefined;
  relatedPosts: Post[];
}

const Post = ({ post, relatedPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return <Status type='error' text='게시글을 불러올 수 없습니다.' fullHeight />;
  }

  const { title, description, keywords, slug, created_at: createdAt } = post;

  return (
    <>
      <Metadata title={title} description={description} keywords={keywords} url={`/blog/${slug}`} />
      <PostDetail title={title} slug={slug} createdAt={createdAt} relatedPosts={relatedPosts} />
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { posts } = await getAllPosts();

  const post = posts.find((post) => post.slug === params?.slug);

  const relatedPosts = posts
    .filter((post) => post.slug !== params?.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: false,
  };
};
