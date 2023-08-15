import Image from 'next/image';
import { Heading, Text, Divider, UnorderedList, ListItem } from '@chakra-ui/react';
import Metadata from '@/components/Metadata';

const EvChargeIntroduction = () => {
  return (
    <>
      <Metadata
        title={`전기차충전소 찾기, 실시간 조회 서비스 '전기차G'`}
        description={`전기차충전소 찾기 서비스 '전기차G' 소개 및 이용방법`}
        keywords='전기차G, 전기차지, 전기차 충전소, 전기차 충전소 찾기'
        url='/blog/ev-charge-introduction'
      />
      <Heading as='h2' size='xl'>
        전기차충전소 찾기, 실시간 조회 서비스 &apos;전기차G&apos;
      </Heading>
      <Divider my={5} />

      <Heading as='h3' size='lg' my={5}>
        전기차충전소 찾기 - 전기차G 소개
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
      </UnorderedList>
      <br />

      <Heading as='h3' size='lg' my={5}>
        전기차G 이용방법
      </Heading>
      <Text mb={5}>
        1. 가장 먼저, 전기차충전소 실시간 정보를 편리하게 받기 위해선{' '}
        <strong>&apos;위치정보 팝업&apos;</strong> 동의를 하셔야 합니다.
      </Text>
      <Image
        src='/images/blog/ev-charge-introduction/001.jpeg'
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
        src='/images/blog/ev-charge-introduction/002.jpeg'
        alt='전기차G 사용 방법'
        width={800}
        height={879}
      />
      <br />
      <Text mb={5}>
        3. 해당 충전소의 현황과 정보등이 상세하게 제공되고 있습니다. 시간과 요금도 참고하셔서 비교
        후 선택도 가능합니다.
      </Text>
      <Image
        src='/images/blog/ev-charge-introduction/003.jpeg'
        alt='전기차G 사용 방법'
        width={1200}
        height={630}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <br />
    </>
  );
};

export default EvChargeIntroduction;
