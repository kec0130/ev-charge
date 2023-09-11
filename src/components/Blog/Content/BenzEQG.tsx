import Image from 'next/image';
import { Heading, Text, useTheme } from '@chakra-ui/react';

import { convertToSlug, getImgDir } from '@/utils/blog';
import TableOfContents from '../TableOfContents';

const BenzEQG = ({ slug }: { slug: string }) => {
  const theme = useTheme();
  const titles = [
    '2023 벤츠 지바겐 전기차 EQG',
    '지바겐 전기차 EQG 성능',
    '지바겐 EQG 가격',
    '지바겐 전기차 출시일은?',
  ];

  return (
    <>
      <TableOfContents titles={titles} />

      <Text my={5}>벤츠 지바겐 전기차가 출시를 앞두고 있습니다.</Text>
      <Text my={5}>
        이전부터 뜨거운 관심을 모았던 모델인만큼 벤츠 마니아층을 비롯하여 많은 분들의 주목을 받고
        있습니다. 오늘은 지바겐 전기차인 EQG 가격과 출시일 정보를 전달해드리겠습니다.
      </Text>

      <Heading id={convertToSlug(titles[0])} as='h3' size='lg' pt={theme.sizes.navHeight} mb={5}>
        {titles[0]}
      </Heading>
      <Text my={5}>
        벤츠 g바겐은 오랜 시간동안 사랑받은 모델입니다. 1979년 군용차 디자인에서 시작된 이후
        현재까지 특유의 투박함과 박시한 모형을 유지하고 있습니다. 그러한 매력에 남녀노소 할 것 없이
        선호하는 모델 중 하나인데요.
      </Text>
      <Text my={5}>
        전기차 특유의 부드러운 디자인과 달리 EQG는 상징성을 위해 본 디자인을 최대한 살려서 출시할
        것으로 알려졌습니다.
      </Text>
      <Image
        src={`${getImgDir(slug)}/01.jpg`}
        alt='지바겐'
        width={1200}
        height={630}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />

      <Heading id={convertToSlug(titles[1])} as='h3' size='lg' pt={theme.sizes.navHeight} mb={5}>
        {titles[1]}
      </Heading>
      <Text my={5}>
        지바겐 전기차의 성능을 살펴보겠습니다. 4개의 전기모터와 배터리를 기반으로 무려 516마력,
        최고출력은 84.1kg.m 토크를 선보입니다. 또한, 오프로드 용도로도 사용할 수 있는 전기차용
        변속기도 장착하여 남다른 퍼포먼스를 계획중이라고 합니다.
      </Text>
      <Image
        src={`${getImgDir(slug)}/02.jpg`}
        alt='지바겐'
        width={1200}
        height={630}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <Text my={5}>
        지바겐 EQG의 또 다른 장점은 전기모터를 개별적으로 제어할 수 있어서 각 도로 컨디션에 따른
        주행 성능을 갖추게 됩니다.
      </Text>
      <Image
        src={`${getImgDir(slug)}/03.jpg`}
        alt='지바겐'
        width={1200}
        height={630}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />

      <Heading id={convertToSlug(titles[2])} as='h3' size='lg' pt={theme.sizes.navHeight} mb={5}>
        {titles[2]}
      </Heading>
      <Text my={5}>
        벤츠 지바겐 전기차 가격은 아직 공식적으로 나오지 않았지만, 기존의 지바겐 모델과 비교해보면
        얼핏 예상해볼 수 있습니다. AMG G63모델의 경우는 우리나라 돈으로 2억 2천만원대부터
        시작되는데요.
      </Text>
      <Text my={5}>
        전기차 모델이 좀 더 가격이 높은 것을 감안하면 한화로 2억 5천만원부터 시작가로 예상되고
        있습니다.
      </Text>
      <Image
        src={`${getImgDir(slug)}/04.jpg`}
        alt='지바겐'
        width={1200}
        height={630}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />

      <Heading id={convertToSlug(titles[3])} as='h3' size='lg' pt={theme.sizes.navHeight} mb={5}>
        {titles[3]}
      </Heading>
      <Text my={5}>
        지바겐 전기차 모델의 생산은 2024년부터 본격적으로 시작할 예정이라고 합니다. G클래스 고유의
        디자인을 살리면서 전기차 특유의 포인트를 넣은 외관 디자인과 최첨단 실내 인테리어를 장착하여
        최상의 편의시설을 선보일 것으로 기대를 모으고 있습니다.
      </Text>
      <Text my={5}>이상 벤츠 지바겐 전기차 가격과 출시 정보에 대해서 간략하게 살펴보았습니다.</Text>
    </>
  );
};

export default BenzEQG;
