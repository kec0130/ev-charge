import { Box, Divider, Spinner, useTheme } from '@chakra-ui/react';

import useStation from '@/hooks/useStation';
import useDistrict from '@/hooks/useDistrict';
import useChargers from '@/hooks/useChargers';

import StationHeader from './StationHeader';
import ChargerTable from './ChargerTable';
import StationTable from './StationTable';
import Loading from './Loading';
import { CarLogoIcon } from '../../../public/icons';

interface Props {
  isLoadingLocation: boolean;
}

const ChargerDetail = ({ isLoadingLocation }: Props) => {
  const { stationId } = useStation();
  const { districtCode } = useDistrict();
  const { chargers, isLoading: isLoadingData } = useChargers(districtCode || '');
  const theme = useTheme();

  return (
    <Box w='full' maxW='container.xl' pt={stationId ? 2 : 20} pb={stationId ? 6 : 0}>
      {isLoadingLocation && (
        <Loading
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='현 위치를 찾는 중입니다...'
        />
      )}

      {isLoadingData && (
        <Loading
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='충전소 정보를 불러오는 중입니다...'
        />
      )}

      {chargers && !stationId && <Loading icon={<CarLogoIcon />} text='충전소를 선택해주세요.' />}

      {chargers && stationId && (
        <>
          <StationHeader station={chargers.data[stationId][0]} />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <ChargerTable chargers={chargers.data[stationId]} />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <StationTable station={chargers.data[stationId][0]} />
        </>
      )}
    </Box>
  );
};

export default ChargerDetail;
