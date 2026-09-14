import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAtomValue } from 'jotai';
import { currentLocationAtom, isLoadingLocationAtom } from '@/states/map';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useGeocode from '@/hooks/useGeocode';
import useMap from '@/hooks/useMap';
import Map from '@/components/Map';
import Metadata from '@/components/Common/Metadata';
import ErrorPage from '@/components/Common/ErrorPage';

export default function Home() {
  const loading = useAtomValue(isLoadingLocationAtom);
  const location = useAtomValue(currentLocationAtom);
  const { getCurrentLocation } = useCurrentLocation();
  const { map, moveMap } = useMap();
  const { reverseGeocode } = useGeocode();
  useEffect(() => {
    getCurrentLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (loading || !map) return;
    moveMap(location);
    reverseGeocode(location, true);
  }, [location, loading, map]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Metadata url='/' />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Map />
      </ErrorBoundary>
    </>
  );
}
