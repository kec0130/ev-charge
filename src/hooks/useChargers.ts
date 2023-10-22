import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import useSWR from 'swr';
import axios from 'axios';

import { ChargerInfoRes } from '@/types/charger';
import { currentDistrictAtom, currentLocationAtom, filterOptionAtom } from '@/states/map';
import { Coord } from '@/types/map';

const fetcher = (url: string, districtCode: string, currentLocation: Coord) =>
  axios
    .get<ChargerInfoRes>(url, {
      params: {
        districtCode,
        lat: currentLocation[0],
        lng: currentLocation[1],
      },
    })
    .then((res) => res.data);

const useChargers = () => {
  const [filteredData, setFilteredData] = useState<ChargerInfoRes>();
  const currentLocation = useAtomValue(currentLocationAtom);
  const districtCode = useAtomValue(currentDistrictAtom);
  const filterOption = useAtomValue(filterOptionAtom);

  const { data, isLoading, error } = useSWR(
    districtCode ? [process.env.NEXT_PUBLIC_CHARGER_API_URL!, districtCode, currentLocation] : null,
    ([url, districtCode, currentLocation]) => fetcher(url, districtCode, currentLocation),
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      errorRetryInterval: 3000,
      errorRetryCount: 3,
      onSuccess: (data) => setFilteredData(data),
    },
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
