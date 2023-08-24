import useSWR from 'swr';
import axios from 'axios';
import { ChargerInfoRes } from '@/types/charger';

const fetcher = (url: string, districtCode: string) =>
  axios.get<ChargerInfoRes>(url, { params: { districtCode } }).then((res) => res.data);

const useChargers = (districtCode: string) => {
  const { data, isLoading } = useSWR(
    districtCode ? ['/api/chargers', districtCode] : null,
    ([url, districtCode]) => fetcher(url, districtCode),
    { dedupingInterval: 1000 * 10 }
  );

  return {
    data,
    isLoading,
  };
};

export default useChargers;
