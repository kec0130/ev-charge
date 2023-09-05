import { useAtomValue } from 'jotai';
import { Spinner, useTheme } from '@chakra-ui/react';

import { currentStationAtom, isLoadingLocationAtom, showNearbyStationsAtom } from '@/states/map';
import useChargers from '@/hooks/useChargers';
import Status from './Status';
import StationInfo from './StationInfo';
import NearbyStations from './NearbyStations';
import { CarLogoIcon, MarkerErrorIcon } from '../../../public/icons';

const ChargerDetail = () => {
  const currentStation = useAtomValue(currentStationAtom);
  const isLoadingLocation = useAtomValue(isLoadingLocationAtom);
  const showNearbyStations = useAtomValue(showNearbyStationsAtom);

  const { data, isLoading: isLoadingData, error } = useChargers();
  const theme = useTheme();

  if (isLoadingLocation) {
    return (
      <Status
        icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
        text='현 위치를 찾는 중입니다.'
      />
    );
  }

  if (isLoadingData) {
    return (
      <Status
        icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
        text='충전소 정보를 불러오는 중입니다.'
      />
    );
  }

  if (error || data?.chargerCount === 0) {
    return (
      <Status
        icon={<MarkerErrorIcon />}
        text={`충전소 정보를 불러올 수 없습니다.\n다시 시도해주세요.`}
      />
    );
  }

  if (data && data.chargerCount > 0 && !currentStation) {
    if (showNearbyStations) {
      const stations = data.stations.slice(0, 10);
      return <NearbyStations stations={stations} />;
    }
    return <Status icon={<CarLogoIcon />} text='충전소를 선택해주세요.' />;
  }

  if (data && currentStation) {
    const station = data.stations.find((station) => station.statId === currentStation);
    if (!station) {
      return (
        <Status
          icon={<MarkerErrorIcon />}
          text={`충전소 정보를 불러올 수 없습니다.\n다시 시도해주세요.`}
        />
      );
    }
    return <StationInfo station={station} />;
  }

  return (
    <Status icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />} text=' ' />
  );
};

export default ChargerDetail;
