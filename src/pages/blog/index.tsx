import generateRssFeed from '@/utils/rss';
import Metadata from '@/components/Metadata';
import PostList from '@/components/Blog/PostList';

const Blog = () => {
  return (
    <>
      <Metadata
        title='블로그'
        description='전기차와 관련된 유용한 정보를 알려드립니다.'
        keywords='전기차 블로그, 전기차 정보, 전기차 팁'
        url='/blog'
      />
      <PostList />
    </>
  );
};

export const getStaticProps = async () => {
  generateRssFeed();

  return {
    props: {},
  };
};

export default Blog;
