import { Box, Heading, Text } from '@chakra-ui/react';

const StationHeader = () => {
  return (
    <Box p={4}>
      <Heading as='h1' size='md' mb={2}>
        충전소 이름
      </Heading>
      <Text>충전소 주소</Text>
    </Box>
  );
};

export default StationHeader;
