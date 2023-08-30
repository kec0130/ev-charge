import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import useSWR from 'swr';
import axios from 'axios';

import { ChargerInfoRes } from '@/types/charger';
import { currentDistrictAtom } from '@/states/map';
import useFilters from './useFilters';

const fetcher = (url: string, districtCode: string) =>
  axios.get<ChargerInfoRes>(url, { params: { districtCode } }).then((res) => res.data);

const useChargers = () => {
  const [filteredData, setFilteredData] = useState<ChargerInfoRes>();
  const districtCode = useAtomValue(currentDistrictAtom);
  const { filterOption } = useFilters();

  const { data, isLoading, error } = useSWR(
    districtCode ? ['/api/chargers', districtCode] : null,
    ([url, districtCode]) => fetcher(url, districtCode),
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      errorRetryInterval: 3000,
      errorRetryCount: 3,
      onSuccess: (data) => setFilteredData(data),
    }
  );

  useEffect(() => {
    const filterData = () => {
      if (!data) return;

      const { onlyAvailable, onlyFastCharger } = filterOption;
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
  }, [data, filterOption]);

  return {
    data: filteredData,
    isLoading,
    error,
  };
};

export default useChargers;
