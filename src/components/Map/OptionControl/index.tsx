import { Box, Flex, useTheme } from '@chakra-ui/react';

import { Coord } from '@/types/map';
import AddressSelector from './AddressSelector';
import MarkerInfoModal from './MarkerInfoModal';
import Filter from './Filter';

const OptionControl = ({ currentLocation }: { currentLocation: Coord }) => {
  const theme = useTheme();

  return (
    <Box pos='absolute' zIndex={theme.zIndex.select} p={3}>
      <Flex gap={3}>
        <AddressSelector currentLocation={currentLocation} />
      </Flex>
      <Flex gap={3} mt={3}>
        <Filter />
        <MarkerInfoModal />
      </Flex>
    </Box>
  );
};

export default OptionControl;
