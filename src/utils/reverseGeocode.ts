import { mutate } from 'swr';
import { Coord } from '@/types/map';
import { CURRENT_DISTRICT_KEY } from '@/constants/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';

export const reverseGeocode = (coord: Coord) => {
  naver.maps.Service.reverseGeocode(
    { coords: new naver.maps.LatLng(...coord) },
    (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        console.log('Failed to reverse geocode.');
      }

      try {
        const city = response.v2.results[0].region.area1.name;
        const district = response.v2.results[0].region.area2.name.split(' ')[0];
        const matchedDistricts = Object.keys(DISTRICT_CODE).filter(
          (key) => DISTRICT_CODE[key] === district
        );

        if (matchedDistricts.length > 1) {
          const matchedCity = Object.keys(CITY_CODE).find((key) => CITY_CODE[key] === city);
          const matchedDistrict = matchedDistricts.find((district) =>
            district.startsWith(matchedCity!)
          );
          mutate(CURRENT_DISTRICT_KEY, matchedDistrict || '');
        }
        mutate(CURRENT_DISTRICT_KEY, matchedDistricts[0]);
      } catch (e) {
        console.log(response.v2.status.message);
      }
    }
  );
};
