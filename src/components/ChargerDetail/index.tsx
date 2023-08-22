import { Box, Divider, Spinner, Text, useTheme } from '@chakra-ui/react';

import useStation from '@/hooks/useStation';
import useDistrict from '@/hooks/useDistrict';
import useStations from '@/hooks/useStations';
import useStationDetail from '@/hooks/useStationDetail';

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
  const { data: stations, isLoading: isLoadingChargers } = useStations(districtCode || '');
  const { data: stationDetail } = useStationDetail(stationId || '');
  const theme = useTheme();

  return (
    <Box w='full' maxW='container.xl' pt={stationId ? 2 : 20}>
      {isLoadingLocation && (
        <Loading
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='현 위치를 찾는 중입니다...'
        />
      )}

      {isLoadingChargers && (
        <Loading
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='충전소 정보를 불러오는 중입니다...'
        />
      )}

      {stations && !stationId && <Loading icon={<CarLogoIcon />} text='충전소를 선택해주세요.' />}

      {stations && stationId && (
        <>
          {/* <StationHeader station={chargers.data[stationId][0]} />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <ChargerTable chargers={chargers.data[stationId]} />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <StationTable station={chargers.data[stationId][0]} /> */}
          <Text color='gray.400' fontSize='xs' textAlign='center' mt={2} mb={6}>
            데이터 출처: 한국환경공단
          </Text>
        </>
      )}
    </Box>
  );
};

export default ChargerDetail;
