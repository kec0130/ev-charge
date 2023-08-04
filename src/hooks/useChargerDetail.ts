import { Charger } from '@/types/charger';
import useStation from './useStation';
import useDistrict from './useDistrict';
import useChargers from './useChargers';

interface ChargerDetail {
  station: Charger | null;
  chargers: Charger[] | null;
}

const useChargerDetail = (): ChargerDetail => {
  const { stationId } = useStation();
  const { districtCode } = useDistrict();
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
