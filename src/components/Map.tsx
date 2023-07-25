import { useEffect, useRef, useState } from 'react';
import { Coord, NaverMap } from '@/types/map.d';

const INITIAL_CENTER: Coord = [37.5666103, 126.9783882];
const INITIAL_ZOOM = 16;
const MAP_ID = 'map';

export default function Map() {
  const [currentLocation, setCurrentPosition] = useState(INITIAL_CENTER);
  const mapRef = useRef<NaverMap | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition([latitude, longitude]);
    });

    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
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
  }, [currentLocation]);

  return <div id={MAP_ID} style={{ width: '100vw', height: '100vh' }} />;
}
