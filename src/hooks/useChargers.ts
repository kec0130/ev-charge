import axios from 'axios';
import useSWR from 'swr';
import { ChargerDataRes } from '@/types/charger';

const getChargersByDistrict = async (url: string, districtCode: string) => {
  const res = await axios.get<ChargerDataRes>(url, { params: { districtCode } });
  return res.data;
};

const useChargers = (districtCode: string) => {
  const { data, isLoading } = useSWR(
    districtCode ? ['/api/chargers', districtCode] : null,
    ([url, districtCode]) => getChargersByDistrict(url, districtCode),
    { dedupingInterval: 10000 }
  );

  return {
    chargers: data,
    isLoading,
  };
};

export default useChargers;
