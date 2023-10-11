import { Post } from '@/types/supabase';
import { Divider, Text } from '@chakra-ui/react';
import PostList from './PostList';

const RelatedPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Divider my={6} />
      <Text mb={5} fontSize='xl' fontWeight='bold'>
        관련 글 더 보기
      </Text>
      <PostList posts={posts} />
    </>
  );
};

export default RelatedPosts;
