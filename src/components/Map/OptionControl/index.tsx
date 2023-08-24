import { Flex, useTheme } from '@chakra-ui/react';
import { Coord } from '@/types/map';
import AddressSelector from './AddressSelector';
import MarkerInfoModal from './MarkerInfoModal';

const OptionControl = ({ currentLocation }: { currentLocation: Coord }) => {
  const theme = useTheme();

  return (
    <Flex
      pos='absolute'
      zIndex={theme.zIndex.select}
      p={3}
      gap={3}
      sx={{ '& > button': { shadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0px' } }}
    >
      <AddressSelector currentLocation={currentLocation} />
      <MarkerInfoModal />
    </Flex>
  );
};

export default OptionControl;
