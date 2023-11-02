import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import useCurrentLocation from '@/hooks/useCurrentLocation';
import Map from '@/components/Map';
import ChargerDetail from '@/components/ChargerDetail';
import Metadata from '@/components/Common/Metadata';
import ErrorPage from '@/components/Common/ErrorPage';

export default function Home() {
  const { getCurrentLocation } = useCurrentLocation();

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Metadata url='/' />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Map />
        <ChargerDetail />
      </ErrorBoundary>
    </>
  );
}
