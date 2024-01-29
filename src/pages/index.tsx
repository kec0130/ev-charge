import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';

import { currentLocationAtom, isLoadingLocationAtom, isLocationOffAtom } from '@/states/map';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useGeocode from '@/hooks/useGeocode';
import useMap from '@/hooks/useMap';
import Map from '@/components/Map';
import ChargerDetail from '@/components/ChargerDetail';
import Metadata from '@/components/Common/Metadata';
import ErrorPage from '@/components/Common/ErrorPage';
import LocationErrorModal from '@/components/Map/LocationErrorModal';

export default function Home() {
  const [isLoadingLocation] = useAtom(isLoadingLocationAtom);
  const [currentLocation] = useAtom(currentLocationAtom);
  const [isLocationOff] = useAtom(isLocationOffAtom);

  const { getCurrentLocation } = useCurrentLocation();
  const { map, moveMap } = useMap();
  const { reverseGeocode } = useGeocode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoadingLocation || !map) return;
    moveMap(currentLocation);
    reverseGeocode(currentLocation, true);
    isLocationOff && onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, isLoadingLocation, isLocationOff, map]);

  return (
    <>
      <Metadata url='/' />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={null}>
          <Map />
        </Suspense>
        <ChargerDetail />
      </ErrorBoundary>
      <LocationErrorModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
