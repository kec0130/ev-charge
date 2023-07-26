import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Coord, NaverMap } from '@/types/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';

const INITIAL_CENTER: Coord = [37.5666103, 126.9783882];
const INITIAL_ZOOM = 16;
const MAP_ID = 'map';

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(INITIAL_CENTER);
  const [currentDistrict, setCurrentDistrict] = useState('');
  const mapRef = useRef<NaverMap | null>(null);

  // TODO: 리턴 타입 정의
  const getChargers = (districtCode: string) =>
    axios.get(`api/chargers`, { params: { districtCode } }).then((res) => res.data);

  const getCurrentLocation = (onSuccess: (loc: Coord) => void, onError?: () => void) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      onSuccess([latitude, longitude]);
    }, onError);
  };

  const initializeMap = (currentLocation: Coord) => {
    const center = new naver.maps.LatLng(...currentLocation);

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

    naver.maps.Service.reverseGeocode({ coords: center }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        console.log('Something wrong!');
        return;
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
          setCurrentDistrict(matchedDistrict!);
          return;
        }

        const matchedDistrict = matchedDistricts[0];
        setCurrentDistrict(matchedDistrict);
      } catch (e) {
        console.log(response.v2.status.message);
      }
    });
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
    initializeMap(currentLocation);
    getChargers(currentDistrict).then((chargers) => console.log(chargers));
  }, [currentDistrict, currentLocation]);

  return <div id={MAP_ID} style={{ width: '100vw', height: '100vh' }} />;
}
