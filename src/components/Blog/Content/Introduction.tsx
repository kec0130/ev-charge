import Image from 'next/image';
import { UnorderedList, ListItem } from '@chakra-ui/react';

import { BlogHeading, BlogImage, BlogText } from '../Common';
import TableOfContents from '../TableOfContents';
import useImgDirectory from '@/hooks/useImgDirectory';

const Introduction = () => {
  const imgDir = useImgDirectory();
  const alt = '전기차G 사용 방법';
  const titles = ['전기차충전소 찾기 - 전기차G 소개', '전기차G 이용방법'];

  return (
    <>
      <TableOfContents titles={titles} />

      <BlogHeading title={titles[0]} />
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

      <BlogHeading title={titles[1]} />
      <BlogText>
        1. 가장 먼저, 전기차충전소 실시간 정보를 편리하게 받기 위해선{' '}
        <strong>&apos;위치정보 팝업&apos;</strong> 동의를 하셔야 합니다.
      </BlogText>
      <BlogImage src={`${imgDir}/1.jpeg`} alt={alt} />
      <br />

      <BlogText>
        2. 위치가 조회되면 다음과 같이 주변 충전소가 지도상에 표시됩니다. 이후 박스에 표시된
        내용처럼 이름과 주소가 표시되며, &apos;복사&apos; 기능도 활용하실 수 있습니다.
      </BlogText>
      <BlogImage src={`${imgDir}/2.jpeg`} alt={alt} />
      <br />

      <BlogText>
        3. 해당 충전소의 현황과 정보등이 상세하게 제공되고 있습니다. 시간과 요금도 참고하셔서 비교
        후 선택도 가능합니다.
      </BlogText>
      <Image src={`${imgDir}/3.jpeg`} alt={alt} width={530} height={582} />
    </>
  );
};

export default Introduction;
