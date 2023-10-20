import { Heading, ListItem, OrderedList, UnorderedList } from '@chakra-ui/react';

import { BlogHeading, BlogHighlight, BlogImage, BlogText } from '../Common';
import TableOfContents from '../TableOfContents';
import AdSense from '@/components/Common/AdSense';
import useImgDirectory from '@/hooks/useImgDirectory';

const HomeCharger = () => {
  const imgDir = useImgDirectory();
  const titles = ['집밥 설치과정', '전기차 집밥 설치 가격', '전기차 충전시간 꿀팁'];
  const alt = '전기차 집밥';

  return (
    <>
      <TableOfContents titles={titles} />

      <BlogText>
        전기차 수요가 늘어나면서 자연스럽게 전기차 집밥 관심도 또한 늘어나고 있습니다. 보통 빌라나
        다세대주택 거주자분들 중 전기차 오너라면 집밥은 필수인데요, 가격과 설치 비용 그리고 과정까지
        요약하여 정보 전달해드리겠습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/01.jpg`} alt={alt} />

      <BlogHeading title={titles[0]} />
      <BlogText>
        <strong>충전기 구입 → 충전기기 설치 및 한전 증설 → 한전불입금 납입 → 충전가능</strong>
      </BlogText>
      <BlogText>
        설치과정은 크게 위와 같이 진행됩니다. 아래에서 세부 내용들을 살펴보도록 하겠습니다.
      </BlogText>
      <BlogText>
        처음으로 전기차를 구매하시는 경우 충전기를 무료로 주는 회사도 있습니다. 국내에서는 현대차,
        기아차, 제네시스 모델의 경우 충전기를 무료로 지급해준다고 하네요.
      </BlogText>
      <BlogText>
        무료 지급 여부는 차량 구매 직전에 꼭 미리 확인해보시기 바라며, 혹여나 무료로 지급받지
        못하셨다면 개별적으로 구매를 하셔야 하는데요. 네이버나 쿠팡에 전기차 충전기 입력하시면 쉽게
        찾아서 구매하실 수 있습니다.
      </BlogText>
      <AdSense />

      <BlogText>
        구매가 끝나셨다면, 이제 집밥 설치를 본격적으로 알아보셔야 합니다. 공동주택(아파트)의 경우는
        설치가 되어있지만, 다세대주택 및 빌라는 개별적으로 설치를 하셔야 됩니다.
      </BlogText>
      <BlogText>
        설치 업체들 또한 워낙 다양하지만, 구하기 어려우시다면 전기차G로 문의 주시면 안내
        도와드리겠습니다.
      </BlogText>
      <BlogText>
        다음 작업으로는 한전에 연락을 하셔야 됩니다. 그 이유는 일반 가정용 전압은 3kW 입니다.
        하지만, 전기차 충전에 필요한 전기량은 최소 7kW가 되어야합니다.
      </BlogText>
      <BlogText>
        따라서 집밥 설치를 위해서는 한전을 통해 전압을 증설해야합니다. 최근에는 11kW 용량을 더
        증가하는 분들도 늘어나고 있습니다. 증설은 대부분 설치업체에서 대행해주곤 합니다.
      </BlogText>
      <BlogText>
        다만, 계량기는 한전에서 직접 설치해주는데요, 7kW 계량기는 무료로 설치해주지만, 11kW부터는
        추가요금이 붙습니다. 또한, 불입금을 납부 후 사용이 가능합니다.
      </BlogText>

      <BlogHeading title={titles[1]} />
      <BlogText>그럼 집밥 설치 가격을 전반적으로 다시 정리해보겠습니다.</BlogText>
      <OrderedList>
        <ListItem>
          <strong>충전기 = 40 ~ 70만원</strong>
          <br /> 차량 구매시 공짜로 제공받는 경우도 있습니다.
        </ListItem>
        <ListItem>
          <strong>설치비용 = 50 ~ 60만원</strong>
        </ListItem>
        <ListItem>
          <strong>한국전력 불입금 = 약 60 ~ 70만원</strong>
        </ListItem>
      </OrderedList>
      <BlogText>
        <BlogHighlight text='총 예상금액 = 150 ~ 200만 원입니다.' />
      </BlogText>
      <BlogText>
        여기에 용량 및 거리에 따라서 추가요금이 늘어날 수 있는점 참고하시기 바랍니다.
      </BlogText>
      <Heading as='h4' size='md' my={5}>
        전기 신설에 대한 불입금 (23.07.01 이후)
      </Heading>
      <BlogImage src={`${imgDir}/02.png`} alt={alt} />
      <BlogText>
        2023년 7월 1일 이후 최근 한전불입금이 더 증가하였습니다. 공중, 지중에 따라서도 금액이 나뉘고
        있으니 꼼꼼하게 확인해보시기 바랍니다.
      </BlogText>
      <BlogImage src={`${imgDir}/03.jpg`} alt={alt} />

      <BlogHeading title={titles[2]} />
      <BlogImage src={`${imgDir}/04.png`} alt={alt} />
      <BlogText>
        마지막으로 전기차 차주분들을 위한 꿀팁을 전달해드리겠습니다. 계절, 시간별로 금액이
        상이한데요, 계절 상관없이 야간시간의 경우 훨씬 저렴하게 충전이 가능합니다.
      </BlogText>
      <UnorderedList>
        <ListItem>22:00 ~ 08:00 (경부하시간대)</ListItem>
      </UnorderedList>
      <BlogText>
        여름철 경부하 시간대에만 충전을 이용하신다면, 일반 가솔린 주유 대비 1/5 가격으로 전기차를
        운용하실 수 있습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/05.png`} alt={alt} />

      <BlogText>
        아직까지 전기차에 대해서 구매를 망설이는 분들이 많습니다. 안전성이나 인프라 측면에서
        부족하다는 걱정을 하시는데요. 하지만 장기적으로 보았을 때 앞으로 전기차 시장이 더욱 커지면서
        현재 대두되는 2가지 문제들 모두 해결될 것으로 기대를 모으고 있습니다.
      </BlogText>
      <BlogText>
        또한, 오늘 집밥과 관련하여 보셨듯이 첫 투자금액을 제외하면 내연기관 차보다 훨씬 저렴한
        가격으로 충전이 가능하여 경제적 효율성을 얻을 수 있습니다.
      </BlogText>
      <BlogText>이상으로 전기차 집밥 설치와 가격에 대한 정보를 모두 살펴보았습니다.</BlogText>
    </>
  );
};

export default HomeCharger;
