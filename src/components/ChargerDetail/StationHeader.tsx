import { Box, Heading, Text } from '@chakra-ui/react';
import { Charger } from '@/types/charger';

const StationHeader = ({ station }: { station: Charger }) => {
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
