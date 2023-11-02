import { useAtomValue } from 'jotai';

import { currentStationAtom, isLoadingLocationAtom, showNearbyStationsAtom } from '@/states/map';
import useChargers from '@/hooks/useChargers';
import Status from '../Common/Status';
import StationInfo from './StationInfo';
import NearbyStations from './NearbyStations';
import BottomSheet from './BottomSheet';

const ChargerDetail = () => {
  const currentStation = useAtomValue(currentStationAtom);
  const isLoadingLocation = useAtomValue(isLoadingLocationAtom);
  const showNearbyStations = useAtomValue(showNearbyStationsAtom);

  const { data, isLoading: isLoadingData, error } = useChargers();

  const getContent = () => {
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
        return <NearbyStations stations={data.stations.slice(0, 10)} />;
      }
      return <Status type='success' text='충전소를 선택해주세요.' />;
    }

    if (data && currentStation) {
      const selectedStation = data.stations.find((station) => station.statId === currentStation);

      if (!selectedStation) {
        if (showNearbyStations) {
          return <NearbyStations stations={data.stations.slice(0, 10)} />;
        }
        return <Status type='success' text='충전소를 선택해주세요.' />;
      }

      return <StationInfo station={selectedStation} />;
    }
  };

  return <BottomSheet>{getContent()}</BottomSheet>;
};

export default ChargerDetail;
