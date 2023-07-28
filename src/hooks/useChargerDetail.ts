import useSWR from 'swr';
import useChargers from './useChargers';
import { Charger } from '@/types/charger';
import { CURRENT_DISTRICT_KEY, CURRENT_STATION_KEY } from '@/constants/map';

interface ChargerDetail {
  station: Charger | null;
  chargers: Charger[] | null;
}

const useChargerDetail = (): ChargerDetail => {
  const { data: stationId } = useSWR<string>(CURRENT_STATION_KEY);
  const { data: districtCode } = useSWR<string>(CURRENT_DISTRICT_KEY);
  const { chargers } = useChargers(districtCode || '');

  if (!stationId || !chargers) {
    return {
      station: null,
      chargers: null,
    };
  }

  return {
    station: chargers.data[stationId][0],
    chargers: chargers.data[stationId],
  };
};

export default useChargerDetail;
