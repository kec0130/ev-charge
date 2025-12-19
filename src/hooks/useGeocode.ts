import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { Coord } from '@/types/map';
import { currentDistrictAtom, currentLocationDistrictAtom, currentStationAtom } from '@/states/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import { convertToCoord } from '@/utils/charger';
import useMap from './useMap';

const SEJONG = {
  name: '세종특별자치시',
  cityCode: '36',
  districtCode: '36110',
};

const useGeocode = () => {
  const [currentDistrict, setCurrentDistrict] = useAtom(currentDistrictAtom);
  const setCurrentLocationDistrict = useSetAtom(currentLocationDistrictAtom);
  const resetCurrentStation = useResetAtom(currentStationAtom);
  const { moveMap } = useMap();

  useEffect(() => {
    resetCurrentStation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDistrict]);

  const updateCurrentDistrict = (districtCode: string, isCurrentLocation?: boolean) => {
    setCurrentDistrict(districtCode);
    isCurrentLocation && setCurrentLocationDistrict(districtCode);
  };

  const reverseGeocode = (coord: Coord, isCurrentLocation?: boolean) => {
    if (!naver.maps.Service) return;

    naver.maps.Service.reverseGeocode(
      { coords: new naver.maps.LatLng(...coord) },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) return;

        try {
          const city = response.v2.results[0].region.area1.name;

          if (city === SEJONG.name) {
            updateCurrentDistrict(SEJONG.districtCode, isCurrentLocation);
            return;
          }

          const district = response.v2.results[0].region.area2.name.split(' ')[0];
          const matchedDistricts = Object.keys(DISTRICT_CODE).filter(
            (key) => DISTRICT_CODE[key] === district
          );

          if (matchedDistricts.length > 1) {
            const matchedCity = Object.keys(CITY_CODE).find((key) => CITY_CODE[key] === city);
            const matchedDistrict = matchedDistricts.find((district) =>
              district.startsWith(matchedCity!)
            );
            updateCurrentDistrict(matchedDistrict!, isCurrentLocation);
            return;
          }

          updateCurrentDistrict(matchedDistricts[0], isCurrentLocation);
        } catch (e) {
          throw new Error(response.v2.status.message);
        }
      }
    );
  };

  const geocode = (cityCode: string, districtCode: string) => {
    const query =
      cityCode === SEJONG.cityCode
        ? CITY_CODE[cityCode]
        : `${CITY_CODE[cityCode]} ${DISTRICT_CODE[districtCode]}`;

    if (!naver.maps.Service) return;

    naver.maps.Service.geocode({ query }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) return;

      try {
        const { x, y } = response.v2.addresses[0];
        moveMap(convertToCoord(y, x));
        setCurrentDistrict(districtCode);
      } catch (e) {
        throw new Error(response.v2.errorMessage);
      }
    });
  };

  return {
    geocode,
    reverseGeocode,
  };
};

export default useGeocode;
