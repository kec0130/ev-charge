import { Divider, List } from '@chakra-ui/react';
import { Post } from 'contentlayer/generated';
import PostListItem from './PostListItem';
import BlogInfeedAds from '../Common/AdSense/BlogInfeedAds';

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <List>
      {posts.map((post, index) => (
        <>
          {index % 3 === 0 && index !== 0 && index !== posts.length - 1 && (
            <>
              <Divider my={6} />
              <BlogInfeedAds />
            </>
          )}
          <PostListItem
            key={post.slug}
            title={post.title}
            description={post.description}
            slug={post.slug}
            imgSrc={post.image_url}
            index={index}
          />
        </>
      ))}
    </List>
  );
};

export default PostList;
