import Image from 'next/image';
import { Box, Container, Divider, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Container as='footer' maxW='container.lg' pb='env(safe-area-inset-bottom)'>
      <Divider />
      <Flex
        fontSize='sm'
        lineHeight={6}
        px={[0, 2]}
        py={10}
        justifyContent='space-between'
        flexDir={['column', 'row']}
        gap={4}
        color='gray.600'
      >
        <Box>
          <Image src='/logo.png' alt='전기차 충전소 찾기' width={80} height={34} />
          <Text>&copy; {new Date().getFullYear()} EV Charge. All Rights Reserved.</Text>
        </Box>

        <Flex
          flexDir={['column', 'column', 'row']}
          gap={4}
          justifyContent='space-between'
          w={['full', '40%']}
        >
          <Flex flexDir='column'>
            <Text fontWeight='bold' textTransform='uppercase'>
              About Us
            </Text>
            <Link href='https://chaechae.life' target='_blank' rel='noreferrer noopener'>
              개발자 소개
            </Link>
          </Flex>
          <Flex flexDir='column'>
            <Text fontWeight='bold' textTransform='uppercase'>
              Family Site
            </Text>
            <Link href='https://messagebot.chaechae.life' target='_blank' rel='noreferrer noopener'>
              메시지봇 - 인사말 생성 AI 챗봇
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
