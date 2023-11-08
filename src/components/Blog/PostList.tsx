import { List } from '@chakra-ui/react';
import { Post } from 'contentlayer/generated';
import PostListItem from './PostListItem';

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <List>
      {posts.map((post, index) => (
        <PostListItem
          key={post.slug}
          title={post.title}
          description={post.description}
          slug={post.slug}
          imgSrc={post.image_url}
          index={index}
        />
      ))}
    </List>
  );
};

export default PostList;
