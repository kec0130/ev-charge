import PostDetail from '@/components/Blog/PostDetail';
import Subsidy from '@/components/Blog/Content/Subsidy';

const Post = () => {
  return (
    <PostDetail
      title='2023 전기차 보조금, 신청방법 핵심정보 요약'
      description='2023년 전기차 보조금과 관련한 정보와 지자체별 금액 등에 대해서 살펴보겠습니다.'
      keywords='전기차 보조금, 전기차 보조금 금액, 지자체별 전기차 보조금, 전기차 차량별 보조금, 전기차 보조금 신청, 전기차 보조금 신청 방법'
      slug='electric-car-subsidy'
      content={<Subsidy />}
    />
  );
};

export default Post;
