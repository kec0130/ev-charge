import { List } from '@chakra-ui/react';
import PostListItem from './PostListItem';

const PostList = () => {
  return (
    <List>
      <PostListItem
        title={`전기차 충전소 찾기, 실시간 조회 서비스 '전기차G'`}
        description='전기차충전소 찾기 서비스 전기차G를 소개합니다. 전국 전기차충전소를 쉽고 빠르게
                  조회하실 수 있습니다. 충전소 위치, 영업시간, 가능여부 등을 실시간으로 정보를
                  전달해드립니다. 위치 파악을 통해 검색 없이도 빠르게 주변 충전소를 찾아보실 수 있는
                  서비스입니다. 충전소 이외 전기차 관련 부가서비스 정보제공을 지속 업데이트 할
                  예정입니다.'
        slug='ev-charge-introduction'
        imgSrc='/og.png'
        imgAlt='전기차G'
      />

      <PostListItem
        title='2023 전기차 보조금, 신청방법 핵심정보 요약'
        description='최근 전기차 수요가 급증하고 있습니다. 각 브랜드에서도 뛰어난 기술력으로 전기차를
                  출시하고 있는데요. 또 하나의 특장점은 바로 보조금입니다. 그러나 전기차 보조금은
                  1년 단위로 수량이 정해져 있기 때문에 선착순으로 혜택을 받으실 수 있는데요, 2023년
                  전기차 보조금과 관련한 정보와 지자체별 금액 등에 대해서 살펴보겠습니다.'
        slug='electric-car-subsidy'
        imgSrc='/images/blog/electric-car-subsidy/01.jpg'
        imgAlt='전기차 보조금'
      />

      <PostListItem
        title='2023 자동차(전기차,수소차,하이브리드) 취득세 핵심 정보'
        description='자동차를 구매하게 되면, 취등록세가 발생하게 됩니다. 전기차도 동일하게 취득세가 부과되는데요. 오늘은 전기차를 중심으로 내연기관 차량들과 비교하여 취득세(취등록세) 정보를 전달해드리겠습니다.'
        slug='green-car-acquisition-tax'
        imgSrc='/images/blog/green-car-acquisition-tax/01.jpg'
        imgAlt='전기차 취득세'
      />
    </List>
  );
};

export default PostList;