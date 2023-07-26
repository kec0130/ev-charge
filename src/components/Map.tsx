import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Coord, NaverMap } from '@/types/map';

const INITIAL_CENTER: Coord = [37.5666103, 126.9783882];
const INITIAL_ZOOM = 16;
const MAP_ID = 'map';

export default function Map() {
  const [currentLocation, setCurrentPosition] = useState(INITIAL_CENTER);
  const mapRef = useRef<NaverMap | null>(null);

  const getChargers = (districtCode: number) =>
    axios.get(`api/chargers/${districtCode}`).then((res) => console.log(res.data));

  const getCurrentLocation = (onSuccess: (loc: Coord) => void, onError?: () => void) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      onSuccess([latitude, longitude]);
    }, onError);
  };

  const initializeMap = (currentLocation: Coord) => {
    const location = new naver.maps.LatLng(...currentLocation);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
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
      position: location,
      map,
    });
  };

  useEffect(() => {
    // TODO: 에러 핸들링
    getCurrentLocation(setCurrentPosition);

    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // TODO: 현위치 로드 후 실행
    initializeMap(currentLocation);
    // TODO: reverse geocoding
    getChargers(11140);
  }, [currentLocation]);

  return <div id={MAP_ID} style={{ width: '100vw', height: '100vh' }} />;
}
