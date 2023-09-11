import { Post } from '@/types/supabase';
import { Divider, List, Text } from '@chakra-ui/react';
import PostListItem from './PostListItem';

const RelatedPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Divider my={6} />
      <Text mb={5} fontSize='xl' fontWeight='bold'>
        관련 글 더 보기
      </Text>
      <List>
        {posts.map(({ id, title, slug, image_url }) => (
          <PostListItem key={id} title={title} slug={slug} imgSrc={image_url} />
        ))}
      </List>
    </>
  );
};

export default RelatedPosts;
