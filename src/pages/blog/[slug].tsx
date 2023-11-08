import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { allPosts, Post } from 'contentlayer/generated';

import PostDetail from '@/components/Blog/PostDetail';
import Metadata from '@/components/Common/Metadata';

const Post = ({ post, relatedPosts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Metadata
        title={post.title}
        description={post.description}
        keywords={post.keywords}
        url={`/blog/${post.slug}`}
        image={`/images/blog/${post.slug}/01.jpg`}
      />
      <PostDetail post={post} relatedPosts={relatedPosts} />
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: Post; relatedPosts: Post[] }> = async ({
  params,
}) => {
  const post = allPosts.find((post) => post.slug === params?.slug);

  const relatedPosts = allPosts
    .filter((post) => post.slug !== params?.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (!post) return { notFound: true };

  return {
    props: {
      post,
      relatedPosts,
    },
  };
};
