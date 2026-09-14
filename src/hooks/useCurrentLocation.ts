import { useAtom } from 'jotai';
import { Coord } from '@/types/map';
import { currentLocationAtom, isLoadingLocationAtom, isLocationOffAtom } from '@/states/map';

const useCurrentLocation = () => {
  const [, setIsLoadingLocation] = useAtom(isLoadingLocationAtom);
  const [, setCurrentLocation] = useAtom(currentLocationAtom);
  const [, setIsLocationOff] = useAtom(isLocationOffAtom);

  const onSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const location: Coord = [latitude, longitude];
    setCurrentLocation(location);
    setIsLoadingLocation(false);
  };

  const onError = () => {
    setIsLoadingLocation(false);
    setIsLocationOff(true);
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setIsLocationOff(false);
    if (!navigator.geolocation) {
      onError();
      return;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      timeout: 10000,
      maximumAge: 60000,
    });
  };

  return { getCurrentLocation };
};

export default useCurrentLocation;
