import PostDetail from '@/components/Blog/PostDetail';
import AcquisitionTax from '@/components/Blog/Content/AcquisitionTax';

const Post = () => {
  return (
    <PostDetail
      title='2023 자동차(전기차,수소차,하이브리드) 취득세 핵심 정보'
      description='2023 친환경 자동차 취득세, 취등록세 핵심 정보'
      keywords='자동차 취득세, 전기차 취득세, 수소차 취득세, 하이브리드 취득세, 자동차 취등록세, 전기차 취등록세, 전기차 취득세 감면'
      slug='green-car-acquisition-tax'
      content={<AcquisitionTax slug='green-car-acquisition-tax' />}
    />
  );
};

export default Post;
