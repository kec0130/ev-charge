import Image from 'next/image';
import { Heading, Text, UnorderedList, ListItem, useTheme, Divider, List } from '@chakra-ui/react';

import { convertToSlug } from '@/utils/blog';
import TableOfContents from '../TableOfContents';
import PostListItem from '../PostListItem';

const Introduction = ({ slug }: { slug: string }) => {
  const theme = useTheme();
  const imgDir = `/images/blog/${slug}`;
  const titles = ['전기차충전소 찾기 - 전기차G 소개', '전기차G 이용방법'];

  return (
    <>
      <TableOfContents titles={titles} />

      <Heading id={convertToSlug(titles[0])} as='h3' size='lg' pt={theme.sizes.navHeight} mb={5}>
        {titles[0]}
      </Heading>
      <UnorderedList mb={5}>
        <ListItem>전국 전기차충전소를 쉽고 빠르게 조회하실 수 있습니다.</ListItem>
        <ListItem>충전소 위치, 영업시간, 가능여부 등을 실시간으로 정보를 전달해드립니다.</ListItem>
        <ListItem>
          위치 파악을 통해 검색 없이도 빠르게 주변 충전소를 찾아보실 수 있는 서비스입니다.
        </ListItem>
        <ListItem>
          충전소 이외 전기차 관련 부가서비스 정보제공을 지속 업데이트 할 예정입니다.
        </ListItem>
        <ListItem>
          본 서비스에 활용된 충전소 정보는 <strong>한국환경공단</strong>에서 제공하는 정보를
          기반으로 합니다.
        </ListItem>
      </UnorderedList>

      <Heading id={convertToSlug(titles[1])} as='h3' size='lg' pt={theme.sizes.navHeight} mb={5}>
        {titles[1]}
      </Heading>
      <Text mb={5}>
        1. 가장 먼저, 전기차충전소 실시간 정보를 편리하게 받기 위해선{' '}
        <strong>&apos;위치정보 팝업&apos;</strong> 동의를 하셔야 합니다.
      </Text>
      <Image
        src={`${imgDir}/1.jpeg`}
        alt='전기차G 사용 방법'
        width={1200}
        height={630}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <br />

      <Text mb={5}>
        2. 위치가 조회되면 다음과 같이 주변 충전소가 지도상에 표시됩니다. 이후 박스에 표시된
        내용처럼 이름과 주소가 표시되며, &apos;복사&apos; 기능도 활용하실 수 있습니다.
      </Text>
      <Image
        src={`${imgDir}/2.jpeg`}
        alt='전기차G 사용 방법'
        width={1200}
        height={470}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <br />

      <Text mb={5}>
        3. 해당 충전소의 현황과 정보등이 상세하게 제공되고 있습니다. 시간과 요금도 참고하셔서 비교
        후 선택도 가능합니다.
      </Text>
      <Image src={`${imgDir}/3.jpeg`} alt='전기차G 사용 방법' width={800} height={879} />

      <Divider my={6} />
      <Text mb={5} fontSize='xl' fontWeight='bold'>
        관련 글 더 보기
      </Text>
      <List>
        <PostListItem
          title='2023 전기차 보조금, 신청방법 핵심정보 요약'
          slug='electric-car-subsidy'
          imgSrc='/images/blog/electric-car-subsidy/01.jpg'
          imgAlt='전기차 보조금'
        />
        <PostListItem
          title='2023 자동차(전기차,수소차,하이브리드) 취득세 핵심 정보'
          slug='green-car-acquisition-tax'
          imgSrc='/images/blog/green-car-acquisition-tax/01.jpg'
          imgAlt='전기차 취득세'
        />
      </List>
    </>
  );
};

export default Introduction;
