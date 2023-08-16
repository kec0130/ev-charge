import useCurrentLocation from '@/hooks/useCurrentLocation';
import Map from '@/components/Map';
import ChargerDetail from '@/components/ChargerDetail';
import Metadata from '@/components/Metadata';

export default function Home() {
  const { isLoading, currentLocation } = useCurrentLocation();

  return (
    <>
      <Metadata url='/' />
      <Map isLoadingLocation={isLoading} currentLocation={currentLocation} />
      <ChargerDetail isLoadingLocation={isLoading} />
    </>
  );
}
