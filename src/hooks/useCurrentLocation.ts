import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { Coord } from '@/types/map';
import { currentLocationAtom, isLoadingLocationAtom } from '@/states/map';
import useMap from './useMap';
import useGeocode from './useGeocode';

const useCurrentLocation = () => {
  const [isLoadingLocation, setIsLoadingLocation] = useAtom(isLoadingLocationAtom);
  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  const { map, moveMap } = useMap();
  const { reverseGeocode } = useGeocode();

  const onSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const location: Coord = [latitude, longitude];
    setCurrentLocation(location);
    setIsLoadingLocation(false);
  };

  const onError = () => {
    alert('현 위치 근처 충전소를 찾기 위해 위치 서비스 권한을 허용해주세요.');
    setIsLoadingLocation(false);
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  useEffect(() => {
    if (isLoadingLocation || !map) return;
    moveMap(currentLocation);
    reverseGeocode(currentLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, isLoadingLocation, map]);

  return { getCurrentLocation };
};

export default useCurrentLocation;
