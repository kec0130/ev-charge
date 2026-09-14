import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import useSWR from 'swr';
import axios from 'axios';

import { ChargerInfoRes } from '@/types/charger';
import { currentDistrictAtom, currentLocationAtom, filterOptionAtom } from '@/states/map';
import { Coord } from '@/types/map';
import { filterStations } from '@/utils/stations';

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
  const currentLocation = useAtomValue(currentLocationAtom);
  const districtCode = useAtomValue(currentDistrictAtom);
  const filterOption = useAtomValue(filterOptionAtom);

  const { data, isLoading, error } = useSWR(
    districtCode ? ['/api/chargers', districtCode, currentLocation] : null,
    ([url, districtCode, currentLocation]) => fetcher(url, districtCode, currentLocation),
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      errorRetryInterval: 3000,
      errorRetryCount: 3,
    }
  );

  const filteredData = useMemo(
    () => data ? filterStations(data, filterOption) : undefined,
    [data, filterOption]
  );

  return {
    data: filteredData,
    isLoading,
    error,
  };
};

export default useChargers;
