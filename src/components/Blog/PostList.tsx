import { Divider, List } from '@chakra-ui/react';
import { Post } from 'contentlayer/generated';
import PostListItem from './PostListItem';
import BlogInfeedDesktopAds from '../Common/AdSense/BlogInfeedDesktopAds';

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <List>
      {posts.map((post, index) => (
        <>
          <PostListItem
            key={post.slug}
            title={post.title}
            description={post.description}
            slug={post.slug}
            imgSrc={post.image_url}
            index={index}
          />
          {index !== 0 && index !== posts.length - 1 && index % 4 === 0 && (
            <>
              <Divider my={6} />
              <BlogInfeedDesktopAds />
            </>
          )}
        </>
      ))}
    </List>
  );
};

export default PostList;
