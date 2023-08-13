import useCurrentLocation from '@/hooks/useCurrentLocation';
import Map from '@/components/Map';
import ChargerDetail from '@/components/ChargerDetail';
import AddressSelector from '@/components/AddressSelector';
import Metadata from '@/components/Metadata';

export default function Home() {
  const { currentLocation, isLocationFound } = useCurrentLocation();

  return (
    <>
      <Metadata url='/' />
      <AddressSelector currentLocation={currentLocation} />
      <Map isLocationFound={isLocationFound} currentLocation={currentLocation} />
      <ChargerDetail isLocationFound={isLocationFound} />
    </>
  );
}
