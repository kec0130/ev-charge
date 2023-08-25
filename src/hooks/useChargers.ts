import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

import { ChargerInfoRes, FilterOption } from '@/types/charger';

const fetcher = (url: string, districtCode: string) =>
  axios.get<ChargerInfoRes>(url, { params: { districtCode } }).then((res) => res.data);

const useChargers = (districtCode: string, option: FilterOption) => {
  const [filteredData, setFilteredData] = useState<ChargerInfoRes>();

  const { data, isLoading } = useSWR(
    districtCode ? ['/api/chargers', districtCode] : null,
    ([url, districtCode]) => fetcher(url, districtCode),
    {
      dedupingInterval: 1000 * 10,
      onSuccess: (data) => setFilteredData(data),
    }
  );

  useEffect(() => {
    const filterData = () => {
      if (!data) return;

      const { onlyAvailable, onlyFastCharger } = option;
      const filteredStations = data.stations
        .filter((station) => (onlyAvailable ? station.availableCount > 0 : true))
        .filter((station) => (onlyFastCharger ? station.hasFastCharger : true));

      setFilteredData({
        ...data,
        stations: filteredStations,
        stationCount: filteredStations.length,
      });
    };

    filterData();
  }, [data, option]);

  return {
    data: filteredData,
    isLoading,
  };
};

export default useChargers;
