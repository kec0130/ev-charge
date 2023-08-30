import { useEffect } from 'react';

import useCurrentLocation from '@/hooks/useCurrentLocation';
import Map from '@/components/Map';
import ChargerDetail from '@/components/ChargerDetail';
import Metadata from '@/components/Metadata';

export default function Home() {
  const { isLoadingLocation, currentLocation, getCurrentLocation } = useCurrentLocation();

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Metadata url='/' />
      <Map isLoadingLocation={isLoadingLocation} currentLocation={currentLocation} />
      <ChargerDetail isLoadingLocation={isLoadingLocation} />
    </>
  );
}
