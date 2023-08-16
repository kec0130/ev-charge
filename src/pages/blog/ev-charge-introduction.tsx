import PostDetail from '@/components/Blog/PostDetail';
import Introduction from '@/components/Blog/Content/Introduction';

const Post = () => {
  return (
    <PostDetail
      title={`전기차충전소 찾기, 실시간 조회 서비스 '전기차G'`}
      description={`전기차충전소 찾기 서비스 '전기차G' 소개 및 이용방법`}
      keywords='전기차G, 전기차지, 전기차 충전소, 전기차 충전소 찾기'
      slug='ev-charge-introduction'
      content={<Introduction />}
    />
  );
};

export default Post;
