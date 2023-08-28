import PostDetail from '@/components/Blog/PostDetail';
import Subsidy from '@/components/Blog/Content/Subsidy';

const Post = () => {
  return (
    <PostDetail
      title='2023 전기차 보조금, 신청방법 핵심정보 요약'
      description='2023년 전기차 보조금 정보 및 차종별, 지자체별 금액'
      keywords='전기차 보조금, 전기차 보조금 금액, 지자체별 전기차 보조금, 전기차 차량별 보조금, 전기차 보조금 신청, 전기차 보조금 신청 방법'
      slug='electric-car-subsidy'
      content={<Subsidy />}
    />
  );
};

export default Post;
