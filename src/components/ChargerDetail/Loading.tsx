import { Flex, Text } from '@chakra-ui/react';

interface Props {
  icon: React.ReactNode;
  text: string;
}

const Loading = ({ icon, text }: Props) => {
  return (
    <Flex h='full' justify='center' align='center' flexDir='column' gap={6}>
      {icon}
      <Text color='gray.600'>{text}</Text>
    </Flex>
  );
};

export default Loading;
