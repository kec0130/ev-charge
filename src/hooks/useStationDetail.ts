import useSWR from 'swr';
import axios from 'axios';
import { StationDetail } from '@/types/charger';

const fetcher = (url: string) => axios.get<StationDetail>(url).then((res) => res.data);

const useStationDetail = (stationId: string) => {
  const { data, isLoading } = useSWR(stationId ? `/api/stations/${stationId}` : null, fetcher);

  return {
    data,
    isLoading,
  };
};

export default useStationDetail;
