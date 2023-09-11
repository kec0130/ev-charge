import { useEffect } from 'react';

import useCurrentLocation from '@/hooks/useCurrentLocation';
import Map from '@/components/Map';
import ChargerDetail from '@/components/ChargerDetail';
import Metadata from '@/components/Common/Metadata';

export default function Home() {
  const { getCurrentLocation } = useCurrentLocation();

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Metadata url='/' />
      <Map />
      <ChargerDetail />
    </>
  );
}
