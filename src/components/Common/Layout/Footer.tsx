import { Box, Container, Divider, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Container
      as='footer'
      maxW='container.lg'
      textAlign='center'
      mb='env(safe-area-inset-bottom)'
      pb={4}
    >
      <Divider mb={4} />
      <Box color='gray.400' fontSize='sm' lineHeight={6}>
        <Text>문의: chaechae.couple@gmail.com</Text>
        <Text>&copy; 전기차G | 전기차 충전소 찾기</Text>
        <Text mt={2} fontWeight='bold' textTransform='uppercase'>
          Family Site
        </Text>
        <a href='https://messagebot.chaechae.life' target='_blank' rel='noreferrer'>
          메시지봇 - 인사말 생성 AI 챗봇
        </a>
      </Box>
    </Container>
  );
};

export default Footer;
