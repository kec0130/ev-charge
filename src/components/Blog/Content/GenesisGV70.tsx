import { ListItem, Tbody, Td, Th, Thead, Tr, UnorderedList } from '@chakra-ui/react';
import { BlogHeading, BlogHighlight, BlogImage, BlogLink, BlogTable, BlogText } from '../Common';
import TableOfContents from '../TableOfContents';
import useImgDirectory from '@/hooks/useImgDirectory';

const GenesisGV70 = () => {
  const imgDir = useImgDirectory();
  const alt = '제네시스 GV70';
  const titles = [
    '제네시스 GV70 전기차 제원',
    'GV70 전기차 인테리어',
    '제네시스 GV70 전기차 가격은?',
    'GV70 전기차 중고 시세',
  ];

  return (
    <>
      <TableOfContents titles={titles} />
      <br />

      <BlogImage src={`${imgDir}/01.jpg`} alt={alt} />
      <BlogText>
        오늘은 제네시스 GV70 전기차 정보를 준비했습니다. 화려한 디자인과 함께 합리적인 차량 사이즈로
        출시와 동시에 폭발적인 인기를 모으고 있는데요. 오늘은 GV70 가격과 함께 중고차 시세 정보를
        전달해드리겠습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/02.jpg`} alt={alt} />

      <BlogHeading title={titles[0]} />
      <BlogTable>
        <Thead>
          <Tr>
            <Th colSpan={3}>차량 제원표</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th>전장(mm)</Th>
            <Td>4,715</Td>
          </Tr>
          <Tr>
            <Th>전고(mm)</Th>
            <Td>1,910</Td>
          </Tr>
          <Tr>
            <Th>전폭(mm)</Th>
            <Td>1,630</Td>
          </Tr>
          <Tr>
            <Th>측간거리</Th>
            <Td>2,875</Td>
          </Tr>
          <Tr>
            <Th>윤거 전</Th>
            <Td>1,647(19인치) / 1,643(20인치)</Td>
          </Tr>
          <Tr>
            <Th>윤거 후</Th>
            <Td>1,661(19인치) / 1,657(20인치)</Td>
          </Tr>
          <Tr>
            <Th>배터리 종류 / 구동방식</Th>
            <Td>리튬 이온 / AWD</Td>
          </Tr>
          <Tr>
            <Th>최고출력</Th>
            <Td>전륜: 160kW, 후륜: 160kW, 합산: 320kW</Td>
          </Tr>
          <Tr>
            <Th>최대토크</Th>
            <Td>전륜: 350Nm, 후륜: 350Nm, 합산: 700Nm</Td>
          </Tr>
        </Tbody>
      </BlogTable>

      <BlogText>
        배터리 용량은 77.4kWh이며, 도심에서는 5.5(km/kWh) , 고속도로는 4.1(km/kWh), 복합 연비는
        4.6(km/kWh) 입니다.
      </BlogText>
      <BlogImage src={`${imgDir}/03.jpg`} alt={alt} orientation='vertical' />

      <BlogHeading title={titles[1]} />
      <BlogText>
        이번 제네시스 GV모델은 여백의 미를 강조한 인테리어를 자랑합니다. 특히 GV70 모델은 거의
        완성형에 가깝다는 극찬을 받고 있는데요.
      </BlogText>
      <BlogImage src={`${imgDir}/04.jpg`} alt={alt} />
      <BlogText>
        마운틴 그래픽 무드라이트는 이름처럼 고요한 산맥을 연상시키는 모형과 야간에는 은은한 조명으로
        고급스러움을 더해줍니다.
      </BlogText>
      <BlogText>
        또한 제네시스 GV70 전기차 시트는 천연 가죽으로 제작되었으며, 30%의 울 원단도 포함되어 장시간
        운전에도 피로를 덜어주며 고급스러운 실내를 자랑합니다.
      </BlogText>
      <BlogImage src={`${imgDir}/05.jpg`} alt={alt} />
      <BlogText>
        인포테인먼트는 14.5인치 고해상도 와이드를 제공합니다. 해당 소프트웨어는 자동으로 업데이트
        되어 편의성 측면에서 우수합니다.
      </BlogText>
      <BlogText>
        제네시스의 심볼이라고 할 수 있죠. 통합 컨트롤러는 터치와 필기가 동시에 가능한 방식을
        도입했습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/06.jpg`} alt={alt} />

      <BlogHeading title={titles[2]} />
      <BlogText>2023년 9월 기준으로 GV70 전기차 가격은 다음 아래와 같습니다.</BlogText>
      <UnorderedList>
        <ListItem>세제혜택 전용전 가격: 77,230,000원</ListItem>
        <ListItem>
          <BlogHighlight text='세제혜택 후 가격: 73,320,000원' />
        </ListItem>
      </UnorderedList>
      <BlogText>
        전기차의 경우는 보조금이 지원되는데요. 지자체별 금액이 다르니 GV70 전기차 보조금 관련한
        내용은 아래에서 상세하게 확인해보시기 바랍니다.
      </BlogText>
      <BlogLink href='/blog/electric-car-subsidy' text='전기차 보조금 확인하기' />
      <BlogImage src={`${imgDir}/07.jpg`} alt={alt} />

      <BlogHeading title={titles[3]} />
      <BlogText>
        마지막으로 GV70 전기차 중고차 시세를 전해드리겠습니다. 시세 기준은 2023년 9월달로 평균값을
        전해드립니다.
      </BlogText>
      <UnorderedList>
        <ListItem>2020년식: 4100만원</ListItem>
        <ListItem>2021년식: 4380만원</ListItem>
        <ListItem>2022년식: 4670만원</ListItem>
        <ListItem>2023년식: 5000만원</ListItem>
      </UnorderedList>
      <BlogText>
        실시간으로 GV70 중고차 시세를 확인하시기 원하시면 아래 링크에서 확인해보시기 바랍니다.
      </BlogText>
      <BlogLink href='/used-cars' text='제네시스 GV70 전기차 중고 시세 확인하기' />
    </>
  );
};

export default GenesisGV70;
