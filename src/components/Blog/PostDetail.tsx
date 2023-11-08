import Link from 'next/link';
import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';
import { Post } from 'contentlayer/generated';

import AdSense from '../Common/AdSense';
import Mdx from './Mdx';
import PostList from './PostList';

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
        <AdSense />
        <Mdx code={post.body.code} />
      </section>
      <section>
        <Divider my={6} />
        <Text mb={5} fontSize='xl' fontWeight='bold'>
          관련 글 더 보기
        </Text>
        <PostList posts={relatedPosts} />
        <Box py={5} display='flex' justifyContent='flex-end'>
          <Button as={Link} href='/blog' variant='link' colorScheme='green' color='green.400'>
            ← 목록으로
          </Button>
        </Box>
      </section>
    </>
  );
};

export default PostDetail;
