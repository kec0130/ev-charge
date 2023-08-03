import useSWR, { mutate } from 'swr';
import { Coord } from '@/types/map';
import { CURRENT_DISTRICT_KEY, CURRENT_STATION_KEY, INITIAL_ZOOM, MAP_KEY } from '@/constants/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';

const useGeocode = () => {
  const { data: districtCode } = useSWR<string>(CURRENT_DISTRICT_KEY);
  const { data: map } = useSWR<naver.maps.Map>(MAP_KEY);

  const updateDistrict = (newDistrictCode: string) => {
    if (districtCode === newDistrictCode) return;
    mutate(CURRENT_DISTRICT_KEY, newDistrictCode);
    mutate(CURRENT_STATION_KEY, '');
  };

  const reverseGeocode = (coord: Coord) =>
    naver.maps.Service.reverseGeocode(
      { coords: new naver.maps.LatLng(...coord) },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) return;

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
            updateDistrict(matchedDistrict || '');
          }

          updateDistrict(matchedDistricts[0]);
        } catch (e) {
          console.log(response.v2.status.message);
        }
      }
    );

  const geocode = (cityCode: string, districtCode: string) => {
    naver.maps.Service.geocode(
      { query: `${CITY_CODE[cityCode]} ${DISTRICT_CODE[districtCode]}` },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) return;

        try {
          const { x, y } = response.v2.addresses[0];
          map?.morph(new naver.maps.LatLng(parseFloat(y), parseFloat(x)), INITIAL_ZOOM);
          updateDistrict(districtCode);
        } catch (e) {
          console.log(response.v2.errorMessage);
        }
      }
    );
  };

  return { geocode, reverseGeocode };
};

export default useGeocode;
