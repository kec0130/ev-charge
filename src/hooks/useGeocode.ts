import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { Coord } from '@/types/map';
import { currentDistrictAtom, currentStationAtom } from '@/states/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import { convertToCoord } from '@/utils/charger';
import useMap from './useMap';

const useGeocode = () => {
  const [currentDistrict, setCurrentDistrict] = useAtom(currentDistrictAtom);
  const resetCurrentStation = useResetAtom(currentStationAtom);
  const { moveMap } = useMap();

  const updateDistrict = (newDistrictCode: string) => {
    if (currentDistrict === newDistrictCode) return;
    setCurrentDistrict(newDistrictCode);
    resetCurrentStation();
  };

  const reverseGeocode = (coord: Coord) =>
    naver.maps.Service.reverseGeocode(
      { coords: new naver.maps.LatLng(...coord) },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) return;

        try {
          const city = response.v2.results[0].region.area1.name;

          if (city === '세종특별자치시') {
            updateDistrict('36110');
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
            updateDistrict(matchedDistrict || '');
            return;
          }

          updateDistrict(matchedDistricts[0]);
        } catch (e) {
          console.log(response.v2.status.message);
        }
      }
    );

  const geocode = (cityCode: string, districtCode: string) => {
    const query =
      cityCode === '36'
        ? CITY_CODE[cityCode]
        : `${CITY_CODE[cityCode]} ${DISTRICT_CODE[districtCode]}`;

    naver.maps.Service.geocode({ query }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) return;

      try {
        const { x, y } = response.v2.addresses[0];
        moveMap(convertToCoord(y, x));
        updateDistrict(districtCode);
      } catch (e) {
        console.log(response.v2.errorMessage);
      }
    });
  };

  return {
    geocode,
    reverseGeocode,
  };
};

export default useGeocode;
