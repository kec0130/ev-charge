import { Box, Divider } from '@chakra-ui/react';

import { StationDTO } from '@/types/charger';
import StationHeader from './StationHeader';
import ChargerTable from './ChargerTable';
import StationTable from './StationTable';
import Review from '../Review';
import MapFixedHeightAds from '@/components/Common/AdSense/MapFixedHeightAds';

const StationInfo = ({ station }: { station: StationDTO }) => {
  return (
    <Box pb={2}>
      <StationHeader station={station} />
      <MapFixedHeightAds />
      <Divider h={2} mt={2} mb={1} bg='gray.200' />
      <ChargerTable chargers={station.chargers} availableCount={station.availableCount} />
      <Divider h={2} my={1} bg='gray.200' />
      <StationTable station={station} />
      <Divider h={2} my={1} bg='gray.200' />
      <Review />
      <MapFixedHeightAds />
    </Box>
  );
};

export default StationInfo;
