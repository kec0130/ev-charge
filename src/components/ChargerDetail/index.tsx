import { useAtomValue } from 'jotai';

import { currentStationAtom, isLoadingLocationAtom, showNearbyStationsAtom } from '@/states/map';
import useChargers from '@/hooks/useChargers';
import Status from '../Common/Status';
import StationInfo from './StationInfo';
import NearbyStations from './NearbyStations';

const ChargerDetail = () => {
  const currentStation = useAtomValue(currentStationAtom);
  const isLoadingLocation = useAtomValue(isLoadingLocationAtom);
  const showNearbyStations = useAtomValue(showNearbyStationsAtom);

  const { data, isLoading: isLoadingData, error } = useChargers();

  if (isLoadingLocation) {
    return <Status type='loading' text='현 위치를 찾는 중입니다.' />;
  }

  if (isLoadingData) {
    return <Status type='loading' text='충전소 정보를 불러오는 중입니다.' />;
  }

  if (error || data?.chargerCount === 0) {
    return <Status type='error' text={`충전소 정보를 불러올 수 없습니다.\n다시 시도해주세요.`} />;
  }

  if (data && data.chargerCount > 0 && !currentStation) {
    if (showNearbyStations) {
      const stations = data.stations.slice(0, 10);
      return <NearbyStations stations={stations} />;
    }
    return <Status type='success' text='충전소를 선택해주세요.' />;
  }

  if (data && currentStation) {
    const station = data.stations.find((station) => station.statId === currentStation);
    if (!station) {
      return <Status type='error' text={`충전소 정보를 불러올 수 없습니다.\n다시 시도해주세요.`} />;
    }
    return <StationInfo station={station} />;
  }

  return <Status type='loading' text=' ' />;
};

export default ChargerDetail;
