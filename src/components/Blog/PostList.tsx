import { Divider, List } from '@chakra-ui/react';
import { Fragment } from 'react';
import type { PostSummary } from '@/types/blog';
import PostListItem from './PostListItem';
import BlogInfeedAds from '../Common/AdSense/BlogInfeedAds';

const PostList = ({ posts }: { posts: PostSummary[] }) => {
  return (
    <List>
      {posts.map((post, index) => (
        <Fragment key={post.slug}>
          {index % 3 === 0 && index !== 0 && index !== posts.length - 1 && (
            <>
              <Divider my={6} />
              <BlogInfeedAds />
            </>
          )}
          <PostListItem
            title={post.title}
            description={post.description}
            slug={post.slug}
            imgSrc={post.image_url}
            index={index}
          />
        </Fragment>
      ))}
    </List>
  );
};

export default PostList;
