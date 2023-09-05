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
                  서비스입니다.'
        slug='ev-charge-introduction'
        imgSrc='/og.png'
        imgAlt='전기차G'
      />
      <PostListItem
        title='2023 전기차 보조금, 신청방법 핵심정보 요약'
        description='최근 전기차 수요가 급증하고 있습니다. 각 브랜드에서도 뛰어난 기술력으로 전기차를
                  출시하고 있는데요. 또 하나의 특장점은 바로 보조금입니다. 그러나 전기차 보조금은
                  1년 단위로 수량이 정해져 있기 때문에 선착순으로 혜택을 받으실 수 있는데요.'
        slug='electric-car-subsidy'
        imgSrc='/images/blog/electric-car-subsidy/01.jpg'
        imgAlt='전기차 보조금'
      />
      <PostListItem
        title='2023 자동차(전기차,수소차,하이브리드) 취득세 핵심 정보'
        description='자동차를 구매하게 되면, 취등록세가 발생하게 됩니다. 전기차도 동일하게 취득세가 부과되는데요. 
                  오늘은 전기차를 중심으로 내연기관 차량들과 비교하여 취득세(취등록세) 정보를 전달해드리겠습니다.'
        slug='green-car-acquisition-tax'
        imgSrc='/images/blog/green-car-acquisition-tax/01.jpg'
        imgAlt='전기차 취득세'
      />
      <PostListItem
        title={`람보르기니 최초 전기차 '란자도르 EV' 가격, 출시일`}
        description={`슈퍼카의 대명사 람보르기니가 최초의 전기차 출시를 앞두고 있어서 자동차 매니아들의 관심을 모으고 
                  있습니다. 이름은 '란자도르' EV 입니다. 4인승 스포츠 SUV 구조를 지닌 란자도르는 우루스와 닮은 외관
                  디자인을 선보이고 있습니다. 따라서 람보르기니의 전통적인 이미지를 고수하면서 미래 지향적인 컨셉도
                  추구하고 있습니다.`}
        slug='lamborghini-lanzador'
        imgSrc='/images/blog/lamborghini-lanzador/01.jpg'
        imgAlt='란자도르'
      />
    </List>
  );
};

export default PostList;
