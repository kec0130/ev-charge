import { Box, Flex, useTheme } from '@chakra-ui/react';

import AddressSelector from './AddressSelector';
import MarkerInfoModal from './MarkerInfoModal';
import Filter from './Filter';

const OptionControl = () => {
  const theme = useTheme();

  return (
    <Box pos='absolute' zIndex={theme.zIndex.select} pt={2} px={3} maxW='full'>
      <Flex gap={3}>
        <AddressSelector />
      </Flex>
      <Flex gap={2} mt={2} alignItems='flex-start'>
        <Filter />
        <MarkerInfoModal />
      </Flex>
    </Box>
  );
};

export default OptionControl;
