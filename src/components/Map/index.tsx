import { Coord } from '@/types/map';
import useMap from '@/hooks/useMap';
import useStation from '@/hooks/useStation';
import useDistrict from '@/hooks/useDistrict';
import useStations from '@/hooks/useStations';

import NaverMap from './NaverMap';
import Marker from './NaverMap/Marker';
import AddressSelector from './AddressSelector';

interface Props {
  isLoadingLocation: boolean;
  currentLocation: Coord;
}

export default function Map({ isLoadingLocation, currentLocation }: Props) {
  const { map } = useMap();
  const { stationId } = useStation();
  const { districtCode } = useDistrict();
  const { data } = useStations(districtCode || '');

  return (
    <>
      <AddressSelector currentLocation={currentLocation} />
      <NaverMap isLoadingLocation={isLoadingLocation} currentLocation={currentLocation}>
        {!isLoadingLocation && <Marker map={map} coord={currentLocation} type='currentLocation' />}
        {data &&
          data.stations.map((station) => (
            <Marker
              map={map}
              coord={[parseFloat(station.lat), parseFloat(station.lng)]}
              type={stationId === station.statId ? 'selected' : 'default'}
              id={station.statId}
              key={station.statId}
            />
          ))}
      </NaverMap>
    </>
  );
}
