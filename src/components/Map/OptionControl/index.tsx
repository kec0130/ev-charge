import { Box, Flex, useTheme } from '@chakra-ui/react';

import AddressSelector from './AddressSelector';
import MarkerInfoModal from './MarkerInfoModal';
import Filter from './Filter';

const OptionControl = () => {
  const theme = useTheme();

  return (
    <Box pos='absolute' zIndex={theme.zIndex.select} p={3}>
      <Flex gap={3}>
        <AddressSelector />
      </Flex>
      <Flex gap={3} mt={3}>
        <Filter />
        <MarkerInfoModal />
      </Flex>
    </Box>
  );
};

export default OptionControl;
