import { Container, Divider, Text } from '@chakra-ui/react';

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
      <Text color='gray.400' fontSize='sm' lineHeight={6}>
        문의: chaechae.couple@gmail.com
        <br />
        &copy; 전기차G | 전기차 충전소 찾기
      </Text>
    </Container>
  );
};

export default Footer;
