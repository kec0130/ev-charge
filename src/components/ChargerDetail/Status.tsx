import { Flex, Text } from '@chakra-ui/react';

interface Props {
  icon?: React.ReactNode;
  text: string;
  footer?: React.ReactNode;
}

const Status = ({ icon, text, footer }: Props) => {
  return (
    <Flex h='40vh' justify='center' align='center' flexDir='column' gap={6}>
      {icon}
      <Text color='gray.600' whiteSpace='pre' textAlign='center'>
        {text}
      </Text>
      {footer}
    </Flex>
  );
};

export default Status;
