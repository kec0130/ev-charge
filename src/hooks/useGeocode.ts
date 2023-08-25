import { Coord } from '@/types/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import useMap from './useMap';
import useCurrentStation from './useCurrentStation';
import useCurrentDistrict from './useCurrentDistrict';

const useGeocode = () => {
  const { moveMap } = useMap();
  const { clearCurrentStation } = useCurrentStation();
  const { currentDistrict, setCurrentDistrict } = useCurrentDistrict();

  const updateDistrict = (newDistrictCode: string) => {
    if (currentDistrict === newDistrictCode) return;
    setCurrentDistrict(newDistrictCode);
    clearCurrentStation();
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
          moveMap([parseFloat(y), parseFloat(x)]);
          updateDistrict(districtCode);
        } catch (e) {
          console.log(response.v2.errorMessage);
        }
      }
    );
  };

  return {
    geocode,
    reverseGeocode,
  };
};

export default useGeocode;
