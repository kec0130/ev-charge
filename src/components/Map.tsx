import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Coord, NaverMap } from '@/types/map';
import { ChargerDataRes } from '@/types/charger';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';

const INITIAL_CENTER: Coord = [37.5666103, 126.9783882];
const INITIAL_ZOOM = 16;
const MAP_ID = 'map';
const DEFAULT_DISTRICT_CODE = '11140';

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState<Coord>([0, 0]);
  // const [currentDistrict, setCurrentDistrict] = useState('');
  const mapRef = useRef<NaverMap | null>(null);

  const getChargers = (districtCode: string) =>
    axios.get<ChargerDataRes>(`api/chargers`, { params: { districtCode } }).then((res) => res.data);

  const getCurrentLocation = (onSuccess: (loc: Coord) => void, onError?: () => void) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      onSuccess([latitude, longitude]);
    }, onError);
  };

  const initializeMap = () => {
    const center = new naver.maps.LatLng(...INITIAL_CENTER);

    const mapOptions: naver.maps.MapOptions = {
      center,
      zoom: INITIAL_ZOOM,
      minZoom: 10,
      scaleControl: true,
      mapDataControl: true,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_CENTER,
      },
    };

    const map = new naver.maps.Map(MAP_ID, mapOptions);
    mapRef.current = map;

    const marker = new naver.maps.Marker({
      position: center,
      map,
    });
  };

  const getDistrictFromCoord = (currentLocation: Coord) => {
    if (currentLocation.includes(0)) return DEFAULT_DISTRICT_CODE;

    const location = new naver.maps.LatLng(...currentLocation);
    let districtCode = '';

    naver.maps.Service.reverseGeocode({ coords: location }, (status, response) => {
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
          districtCode =
            matchedDistricts.find((district) => district.startsWith(matchedCity!)) || '';
        }

        districtCode = matchedDistricts[0];
      } catch (e) {
        console.log(response.v2.status.message);
      }
    });

    return districtCode || DEFAULT_DISTRICT_CODE;
  };

  useEffect(() => {
    // TODO: 현위치 에러 핸들링
    getCurrentLocation(setCurrentLocation);

    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // TODO: 현위치 로드 후 실행
    initializeMap();

    const currentDistrict = getDistrictFromCoord(currentLocation);

    getChargers(currentDistrict).then((chargers) =>
      Object.keys(chargers.data).map((key) => {
        const { lat, lng } = chargers.data[key][0];
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(parseFloat(lat), parseFloat(lng)),
          map: mapRef.current!,
        });
      })
    );
  }, [currentLocation]);

  return <div id={MAP_ID} style={{ width: '100vw', height: '50vh' }} />;
}
