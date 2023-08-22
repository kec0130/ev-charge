import { useEffect, useState } from 'react';
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

type Status =
  | 'LOADING_LOCATION'
  | 'LOADING_STATIONS'
  | 'STATIONS_READY'
  | 'LOADING_STATION_DETAIL'
  | 'STATION_DETAIL_READY';

const ChargerDetail = ({ isLoadingLocation }: { isLoadingLocation: boolean }) => {
  const [status, setStatus] = useState<Status>('LOADING_LOCATION');
  const { stationId } = useStation();
  const { districtCode } = useDistrict();
  const { data: stations } = useStations(districtCode || '');
  const { data: station, isLoading: isLoadingStation } = useStationDetail(stationId || '');
  const theme = useTheme();

  useEffect(() => {
    const getStatus = (): Status => {
      if (isLoadingLocation) return 'LOADING_LOCATION';
      if (!stations) return 'LOADING_STATIONS';
      if (isLoadingStation) return 'LOADING_STATION_DETAIL';
      if (station) return 'STATION_DETAIL_READY';
      return 'STATIONS_READY';
    };

    setStatus(getStatus());
  }, [isLoadingLocation, isLoadingStation, station, stations]);

  return (
    <Box w='full' maxW='container.xl' pt={status === 'STATION_DETAIL_READY' ? 2 : 20}>
      {status === 'LOADING_LOCATION' && (
        <Loading
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='현 위치를 찾는 중입니다.'
        />
      )}

      {status === 'LOADING_STATIONS' && (
        <Loading
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='충전소 목록을 불러오는 중입니다.'
        />
      )}

      {status === 'STATIONS_READY' && (
        <Loading icon={<CarLogoIcon />} text='충전소를 선택해주세요.' />
      )}

      {status === 'LOADING_STATION_DETAIL' && (
        <Loading
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='충전소 정보를 불러오는 중입니다.'
        />
      )}

      {status === 'STATION_DETAIL_READY' && station && (
        <>
          <StationHeader station={station} />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <ChargerTable
            chargers={station.chargers}
            chargerCount={station.chargerCount}
            availableCount={station.availableChargerCount}
          />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <StationTable station={station} />
          <Text color='gray.400' fontSize='xs' textAlign='center' mt={2} mb={6}>
            데이터 출처: 한국환경공단
          </Text>
        </>
      )}
    </Box>
  );
};

export default ChargerDetail;
