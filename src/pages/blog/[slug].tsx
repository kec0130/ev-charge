import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { allPosts, Post } from 'contentlayer/generated';
import { PostSummary, toPostSummary } from '@/types/blog';

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
        image={post.image_url}
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

export const getStaticProps: GetStaticProps<{ post: Post; relatedPosts: PostSummary[] }> = async ({
  params,
}) => {
  const post = allPosts.find((post) => post.slug === params?.slug);
  if (!post) return { notFound: true };

  const keywords = post.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean);
  const relevance = (candidate: Post) => candidate.keywords.split(',')
    .filter((keyword) => keywords.includes(keyword.trim())).length;

  const relatedPosts = allPosts
    .filter((post) => post.slug !== params?.slug)
    .sort((a, b) => relevance(b) - relevance(a) || b.created_at.localeCompare(a.created_at))
    .slice(0, 3)
    .map(toPostSummary);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
};
