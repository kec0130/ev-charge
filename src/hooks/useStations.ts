import useSWR from 'swr';
import axios from 'axios';
import { StationList } from '@/types/charger';

const fetcher = (url: string, districtCode: string) =>
  axios.get<StationList>(url, { params: { districtCode } }).then((res) => res.data);

const useStations = (districtCode: string) => {
  const { data, isLoading } = useSWR(
    districtCode ? ['/api/stations', districtCode] : null,
    ([url, districtCode]) => fetcher(url, districtCode),
    { dedupingInterval: 1000 * 10 }
  );

  return {
    data,
    isLoading,
  };
};

export default useStations;
