import { useEffect, useState } from 'react';

import { Coord } from '@/types/map';
import { INITIAL_CENTER } from '@/constants/map';
import useMap from './useMap';
import useGeocode from './useGeocode';

const useCurrentLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Coord>(INITIAL_CENTER);

  const { map, moveMap } = useMap();
  const { reverseGeocode } = useGeocode();

  const onSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const location: Coord = [latitude, longitude];
    setCurrentLocation(location);
    setIsLoading(false);
  };

  const onError = () => {
    alert('현 위치 근처 충전소를 찾기 위해 위치 서비스 권한을 허용해주세요.');
    setIsLoading(false);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  useEffect(() => {
    if (isLoading || !map) return;
    moveMap(currentLocation);
    reverseGeocode(currentLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, isLoading, map]);

  return {
    isLoadingLocation: isLoading,
    currentLocation,
    getCurrentLocation,
  };
};

export default useCurrentLocation;
