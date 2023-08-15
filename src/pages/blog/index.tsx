import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react';
import Metadata from '@/components/Metadata';

const Blog = () => {
  return (
    <>
      <Metadata
        title='블로그'
        description='전기차와 관련된 유용한 정보를 알려드립니다.'
        keywords='전기차 블로그, 전기차 정보, 전기차 팁'
        url='/blog'
      />
      <List>
        <ListItem mb={12}>
          <Link href='/blog/electric-car-subsidy'>
            <Flex w='full' flexDir={['column', 'row']}>
              <Box
                mr={[0, 8]}
                mb={[4, 0]}
                w='full'
                maxW={['full', 300]}
                borderRadius='md'
                overflow='hidden'
              >
                <Image
                  src='/images/blog/electric-car-subsidy/01.jpg'
                  alt='전기차 보조금'
                  width={300}
                  height={158}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
              <Box>
                <Heading as='h3' size='lg' mb={[2, 4]} noOfLines={[2, 1]}>
                  2023 전기차 보조금, 신청방법 핵심정보 요약
                </Heading>
                <Text noOfLines={[3, 4]}>
                  최근 전기차 수요가 급증하고 있습니다. 각 브랜드에서도 뛰어난 기술력으로 전기차를
                  출시하고 있는데요. 또 하나의 특장점은 바로 보조금입니다. 그러나 전기차 보조금은
                  1년 단위로 수량이 정해져 있기 때문에 선착순으로 혜택을 받으실 수 있는데요, 2023년
                  전기차 보조금과 관련한 정보와 지자체별 금액 등에 대해서 살펴보겠습니다.
                </Text>
              </Box>
            </Flex>
          </Link>
        </ListItem>
      </List>
    </>
  );
};

export default Blog;
