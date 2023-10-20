import { Tbody, Td, Th, Tr } from '@chakra-ui/react';
import { BlogHeading, BlogImage, BlogLink, BlogTable, BlogText } from '../Common';
import TableOfContents from '../TableOfContents';
import useImgDirectory from '@/hooks/useImgDirectory';

const BmwIx50 = () => {
  const imgDir = useImgDirectory();
  const alt = 'BMW iX50';
  const titles = ['iX50 제원', 'BMW iX50 디자인', 'BMW iX50 가격'];

  return (
    <>
      <TableOfContents titles={titles} />

      <BlogText>
        BMW 순수 전기차인 iX50 모델을 소개해드리기 위해 오늘 포스팅을 준비해보았습니다. 최근 전기차
        모델들이 다양하게 늘어나면서 디자인 또한 혁신적으로 변화하고 있는데요. BMW iX50 가격과 제원
        그리고 주행거리와 할인 정보를 살펴보겠습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/01.jpg`} alt={alt} />
      <BlogText>
        iX 모델은 크게 iX1, iX3, iX40, iX50, M60으로 나뉘게 됩니다. 그중에서도 오늘 소개하는 50
        모델이 대표 모델로 손꼽히고 있습니다.
      </BlogText>

      <BlogHeading title={titles[0]} />
      <BlogText>우선 제원을 먼저 살펴보도록 하겠습니다.</BlogText>
      <BlogImage src={`${imgDir}/02.jpg`} alt={alt} />
      <br />

      <BlogTable>
        <Tbody>
          <Tr>
            <Th>공차 중량 (kg)</Th>
            <Td>2,590</Td>
          </Tr>
          <Tr>
            <Th>차량 총 중량 (kg)</Th>
            <Td>2,915</Td>
          </Tr>
          <Tr>
            <Th>전장 (mm)</Th>
            <Td>4,955</Td>
          </Tr>
          <Tr>
            <Th>전폭 (mm)</Th>
            <Td>1,965</Td>
          </Tr>
          <Tr>
            <Th>전고 (mm)</Th>
            <Td>1,695</Td>
          </Tr>
          <Tr>
            <Th>휠베이스 (mm)</Th>
            <Td>3,000</Td>
          </Tr>
          <Tr>
            <Th>탑승 인원</Th>
            <Td>5인승</Td>
          </Tr>
          <Tr>
            <Th>트렁크 용량</Th>
            <Td>500 - 1,750L</Td>
          </Tr>
        </Tbody>
      </BlogTable>

      <BlogText>
        BMW iX50은 기존의 X5 모델과 비교해보면 전고, 전폭을 빼곤 더 사이즈가 큰 편입니다. 따라서
        크기로만 보면 대형에 속합니다. 주행거리는 1회 충전시 평균 447KM 이동이 주행이 가능합니다.
      </BlogText>
      <BlogText>
        마력은 최대 523, 최대토크는 무려 78KG.M으로 제로백은 무려 4.6초에 도달가능합니다. 엄청난
        퍼포먼스를 자랑하네요.
      </BlogText>

      <BlogHeading title={titles[1]} />
      <BlogImage src={`${imgDir}/03.jpg`} alt={alt} />
      <BlogText>
        외관 디자인을 시작으로 인테리어까지 알아보겠습니다. 우선 외관 전면부는 헤드라이트가
        인상적입니다. 최근 BMW 모델의 헤드램프는 얇고 길게 빠지는 디자인을 채택하고 있는데요.
        처음에는 반감을 갖는 분들도 많았지만, 7시리즈 이후로는 호평이 늘어나고 있습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/04.jpg`} alt={alt} />
      <br />
      <BlogImage src={`${imgDir}/05.jpg`} alt={alt} orientation='square' />
      <BlogText>
        휠은 22인치가 적용되어 굉장히 큰 느낌을 줍니다. 1020 제트 블랙으로 BMW만의 매력과 동시에
        세련된 미를 자랑합니다.
      </BlogText>
      <BlogImage src={`${imgDir}/06.jpg`} alt={alt} />
      <BlogText>
        개인적으로 BMW iX50 모델의 트렁크는 조금 아쉽습니다. X5보다 작은 사이즈로 기본용량은 500L
        이며, 뒷자석을 접을 경우 최대 1,750L까지 공간을 제공합니다. 골프백을 넣기엔 기본 용량으론
        사선으로 한 개 정도 들어갈 것 같습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/07.jpg`} alt={alt} />
      <br />
      <BlogImage src={`${imgDir}/08.jpg`} alt={alt} />
      <BlogText>
        내부 인테리어 또한 굉장히 혁신적입니다. 스티어링 휠은 헥사고날로 적용되어 미래지향적인
        느낌을 선사하는데요. 가장 눈에 띄는 건 바로 커브드 디스플레이와 인포테인먼트 부분
        향상입니다. 일체형 디스플레이를 통해 운전 편의성과 디자인 모두를 잡은 iX50 입니다.
      </BlogText>
      <BlogImage src={`${imgDir}/09.jpg`} alt={alt} />

      <BlogHeading title={titles[2]} />
      <BlogText>
        다음은 가격 정보를 전해드립니다. 아무래도 가장 큰 관심사가 아닐까 싶네요. BMW iX50 가격은
        2023년 모델기준으로 1억 4천400만원에 시작됩니다. 아무래도 X시리즈보다 더 비싼 가격대를
        형성하고 있는데요.
      </BlogText>
      <BlogText>
        한 가지 더 아쉬운 점은 <BlogLink href='/blog/electric-car-subsidy' text='보조금' inline />{' '}
        지원이 불가능합니다. 그 이유는 8000만원 초과하는 가격대의 차량이기 때문이죠. 하지만,
        최근들어 iX50 모델은 최대 1800만원까지 할인 프로모션을 진행하기도 합니다. 이러한 기회를 잘
        잡으셔서 내 차 마련의 기회를 잡아보시는 건 어떨까요?
      </BlogText>
      <BlogImage src={`${imgDir}/10.jpg`} alt={alt} />
      <BlogText>
        BMW 공식 홈페이지에서 온라인 예약도 가능합니다. 마지막으로 M60 모델의 경우는 월 180만원
        가량으로 금융리스도 가능하며, 해당 모델은 제로백을 무려 3.6초를 자랑합니다.
      </BlogText>
      <BlogText>이상으로 BMW iX50 가격과 할인 정보등에 대해서 살펴보았습니다.</BlogText>
    </>
  );
};

export default BmwIx50;
