import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import type { Coord } from '@/types/map';
import { currentDistrictAtom, currentLocationDistrictAtom, currentStationAtom } from '@/states/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import { resolveDistrictCode } from '@/utils/regions';
import useMap from './useMap';

export default function useGeocode() {
  const [district, setDistrict] = useAtom(currentDistrictAtom);
  const setLocationDistrict = useSetAtom(currentLocationDistrictAtom);
  const resetStation = useResetAtom(currentStationAtom);
  const { moveMap } = useMap();
  useEffect(() => {
    resetStation();
  }, [district, resetStation]);
  const reverseGeocode = (coord: Coord, isCurrentLocation?: boolean) => {
    if (typeof naver === 'undefined' || !naver.maps.Service) return;
    naver.maps.Service.reverseGeocode(
      { coords: new naver.maps.LatLng(...coord) },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) return;
        const match = response?.v2?.results?.map(resolveDistrictCode).find(Boolean);
        if (!match) return;
        setDistrict(match);
        if (isCurrentLocation) setLocationDistrict(match);
      },
    );
  };
  const geocode = (city: string, code: string) => {
    if (!CITY_CODE[city] || !DISTRICT_CODE[code] || !code.startsWith(city)) return;
    if (typeof naver === 'undefined' || !naver.maps.Service) return;
    const query = city === '36' ? CITY_CODE[city] : `${CITY_CODE[city]} ${DISTRICT_CODE[code]}`;
    naver.maps.Service.geocode({ query }, (status, response) => {
      const address = response?.v2?.addresses?.[0];
      if (status !== naver.maps.Service.Status.OK || !address) return;
      setDistrict(code);
      moveMap([Number(address.y), Number(address.x)]);
    });
  };
  return { geocode, reverseGeocode };
}
