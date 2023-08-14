import { useEffect, useState } from 'react';
import { Coord } from '@/types/map';
import { INITIAL_CENTER } from '@/constants/map';

const useCurrentLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Coord>(INITIAL_CENTER);

  const onSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setCurrentLocation([latitude, longitude]);
    setIsLoading(false);
  };

  const onError = () => {
    alert('현 위치 근처 충전소를 찾기 위해 위치 서비스 권한을 허용해주세요.');
    setIsLoading(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return {
    isLoading,
    currentLocation,
  };
};

export default useCurrentLocation;
