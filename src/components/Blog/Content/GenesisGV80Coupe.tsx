import { Flex, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { BlogHeading, BlogImage, BlogTable, BlogText } from '../Common';
import TableOfContents from '../TableOfContents';
import useImgDirectory from '@/hooks/useImgDirectory';

const GenesisGV80Coupe = () => {
  const imgDir = useImgDirectory();
  const alt = '제네시스 GV80 쿠페';
  const titles = [
    '2024 제네시스 gv80 쿠페 가격 및 제원 정보',
    '제네시스 gv80 쿠페 제원',
    'gv80 쿠페 디자인',
    '제네시스 gv80 쿠페 가격',
  ];

  return (
    <>
      <TableOfContents titles={titles} />

      <BlogHeading title={titles[0]} />
      <BlogText>
        제네시스 gv80 쿠페 모델이 드디어 공개되었습니다. 이전에 콘셉트 카 공개 이후 엄청난 관심을
        모았는데요. 기존 모델보다 컴팩트하면서도 세련된 이미지로 공개 직후 호평이 이어지고 있습니다.
      </BlogText>
      <BlogText>오늘은 제네시스 gv80 쿠페 모델의 가격과 제원등에 대해서 살펴보겠습니다.</BlogText>
      <BlogImage src={`${imgDir}/01.jpg`} alt={alt} />
      <BlogText>
        gv80 페이스리프트 모델인 쿠페는 제네시스만의 디자인 철학을 이어오며, 여기에 역동성을 극대화
        시킨 럭셔리한 suv입니다. 지난 뉴욕에서 콘셉트 모델과 비슷한 디자인으로 출시되어 전 세계
        자동차 마니아들의 관심을 모으고 있습니다.
      </BlogText>
      <Flex>
        <BlogImage src={`${imgDir}/02.png`} alt={alt} orientation='square' widthPercent={50} />
        <BlogImage src={`${imgDir}/03.png`} alt={alt} orientation='square' widthPercent={50} />
      </Flex>

      <BlogHeading title={titles[1]} />
      <BlogTable>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>가솔린 2.5 터보</Th>
            <Th>가솔린 3.5 터보</Th>
            <Th>가솔린 3.5 터보 48v 일렉트릭 슈퍼차저</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th>전장(mm)</Th>
            <Td>4,940</Td>
            <Td>4,965</Td>
            <Td>4,965</Td>
          </Tr>
          <Tr>
            <Th>전폭(mm)</Th>
            <Td>1,975</Td>
            <Td>1,975</Td>
            <Td>1,975</Td>
          </Tr>
          <Tr>
            <Th>측간거리(mm)</Th>
            <Td>2,955</Td>
            <Td>2,955</Td>
            <Td>2,955</Td>
          </Tr>
          <Tr>
            <Th>윤거 전(mm)</Th>
            <Td>1,674</Td>
            <Td>1,674</Td>
            <Td>1,674</Td>
          </Tr>
          <Tr>
            <Th>윤거 후(mm)</Th>
            <Td>1,689</Td>
            <Td>1,689</Td>
            <Td>1,689</Td>
          </Tr>
          <Tr>
            <Th>엔진형식</Th>
            <Td>2.5 T-GDi</Td>
            <Td>3.5 T-GDi</Td>
            <Td>3.5 T-GDi-e-S/C</Td>
          </Tr>
          <Tr>
            <Th>구동방식</Th>
            <Td>2WD/AWD</Td>
            <Td>2WD/AWD</Td>
            <Td>AWD</Td>
          </Tr>
          <Tr>
            <Th>배기량(cc)</Th>
            <Td>2,497</Td>
            <Td>3,470</Td>
            <Td>3,470</Td>
          </Tr>
          <Tr>
            <Th>최고출력 (ps/rpm)</Th>
            <Td>304/5800</Td>
            <Td>380/5,800</Td>
            <Td>415/5,800</Td>
          </Tr>
          <Tr>
            <Th>최대토크 (kgfm/rpm)</Th>
            <Td>43.0/1650~4000</Td>
            <Td>54.0/1300~4500</Td>
            <Td>56.0/1300~4500</Td>
          </Tr>
        </Tbody>
      </BlogTable>

      <BlogText>
        이번 gv80 쿠페 모델에서는 3.5 터보 모델과 동시에 48v 일렉트릭 슈퍼차저 엔진도 출시됩니다.
        최고출력은 415마력과 최대토크는 56까지 나오며, 엄청난 퍼포먼스를 자랑할 것으로 보입니다.
      </BlogText>
      <BlogImage src={`${imgDir}/04.jpg`} alt={alt} />
      <br />
      <BlogImage src={`${imgDir}/05.jpg`} alt={alt} />
      <BlogText>
        또한, 스포츠 쿠페의 배기음을 재연한 액티브 사운드 디자인을 통해 운전의 재미를 더해줄 것으로
        보입니다. 주행모드는 스포츠 + 까지 탑재되어 정숙한 주행과 더불어 스포티한 느낌도 선보이는
        매력적인 제네시스 gv80 쿠페입니다.
      </BlogText>
      <BlogImage src={`${imgDir}/06.jpg`} alt={alt} />

      <BlogHeading title={titles[2]} />
      <BlogText>
        디자인은 페이스리프트 모델답게 부분적으로 변화하였지만, 확연한 차이를 보이고 있습니다.
        헤드램프면에서는 크게 변화한게 없지만, 리어램프나 후면부는 스포티한 느낌을 물씬 살렸는데요.
        리어램프의 경우는 기존의 g80 모델과 비슷한 느낌을 연상시킵니다.
      </BlogText>
      <BlogImage src={`${imgDir}/07.jpg`} alt={alt} orientation='vertical' />
      <BlogText>
        또한, 트렁크 용량도 기존의 gv80 모델 대비 100 리터 가량 축소하였는데요. 이번 쿠페모델은
        644리터를 제공하지만, 접이식 이동이 가능하여 다양한 공간활용을 선보입니다.
      </BlogText>
      <BlogImage src={`${imgDir}/08.jpg`} alt={alt} orientation='vertical' />
      <BlogText>
        실내 인테리어 또한 변화를 주었습니다. 스티어링 휠은 투톤으로 고급스러움을 더하였으며, 기존의
        여백의 미를 고수하면서도 최첨단 시스템 기기들이 장착되어 주행시 편의성과 만족도를
        더하여줍니다.
      </BlogText>
      <BlogImage src={`${imgDir}/09.jpg`} alt={alt} orientation='square' />
      <BlogText>
        또한 디스플레이는 통합형으로 27인치가 적용되어 획일화 되면서도 깔끔한 라인을 제공합니다.
        센터페시아는 모두 터치식으로 변경된 점도 인상깊네요.
      </BlogText>
      <BlogImage src={`${imgDir}/10.png`} alt={alt} />

      <BlogHeading title={titles[3]} />
      <BlogText>
        이번 gv80 쿠페의 가격은 기본 2.5 모델은 6,400만원대에서 시작되며 3.5 터보 모델의 경우에는
        7,000만원대부터 시작을 앞두고 있습니다. 하지만, 여기에 22인치 휠과 여러가지 옵션들을 더하면
        1억을 돌파할 것으로 보이는데요.
      </BlogText>
      <BlogText>
        기존 gv80 모델보다 비싼 가격으로 책정되었지만, 판매량에 있어서 어떤 결과를 가져올지
        궁금해집니다.
      </BlogText>
    </>
  );
};

export default GenesisGV80Coupe;
