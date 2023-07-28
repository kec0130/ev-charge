import { Box, Heading, Text } from '@chakra-ui/react';
import useChargerDetail from '@/hooks/useChargerDetail';

const StationHeader = () => {
  const { station } = useChargerDetail();

  if (!station) return null;

  return (
    <Box p={4}>
      <Heading as='h1' size='md' mb={2}>
        {station.statNm}
      </Heading>
      <Text>{station.addr}</Text>
    </Box>
  );
};

export default StationHeader;
