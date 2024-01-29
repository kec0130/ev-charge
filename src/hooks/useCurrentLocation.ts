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
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { getCurrentLocation };
};

export default useCurrentLocation;
