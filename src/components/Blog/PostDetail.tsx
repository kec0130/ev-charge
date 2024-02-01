import Link from 'next/link';
import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';
import { Post } from 'contentlayer/generated';

import Mdx from './Mdx';
import PostList from './PostList';
import BlogInarticleAds from '../Common/AdSense/BlogInarticleAds';
import BlogInfeedAds from '../Common/AdSense/BlogInfeedAds';

interface Props {
  post: Post;
  relatedPosts: Post[];
}

const PostDetail = ({ post, relatedPosts }: Props) => {
  return (
    <>
      <section>
        <Heading as='h2' size='xl'>
          {post.title}
        </Heading>
        <Text fontSize='sm' color='gray.500' mt={3}>
          {post.created_at.split('T')[0]}
        </Text>
        <Divider my={6} />
        <BlogInarticleAds />
        <Mdx code={post.body.code} />
      </section>
      <section>
        <Divider my={6} />
        <Text mb={5} fontSize='xl' fontWeight='bold'>
          관련 글 더 보기
        </Text>
        <PostList posts={relatedPosts} />
        <Box>
          <Divider my={6} />
          <BlogInfeedAds />
        </Box>
        <Box py={6} display='flex' justifyContent='flex-end'>
          <Button as={Link} href='/blog' variant='link' colorScheme='green' color='green.400'>
            ← 목록으로
          </Button>
        </Box>
      </section>
    </>
  );
};

export default PostDetail;
