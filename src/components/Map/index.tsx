import { Coord } from '@/types/map';
import useMap from '@/hooks/useMap';
import useStation from '@/hooks/useStation';
import useDistrict from '@/hooks/useDistrict';
import useChargers from '@/hooks/useChargers';

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
  const { data } = useChargers(districtCode || '');

  return (
    <>
      <AddressSelector currentLocation={currentLocation} />
      <NaverMap isLoadingLocation={isLoadingLocation} currentLocation={currentLocation}>
        {!isLoadingLocation && <Marker map={map} coord={currentLocation} type='currentLocation' />}
        {data &&
          data.stations.map(({ lat, lng, statId }) => (
            <Marker
              map={map}
              coord={[parseFloat(lat), parseFloat(lng)]}
              type={stationId === statId ? 'selected' : 'default'}
              id={statId}
              key={statId}
            />
          ))}
      </NaverMap>
    </>
  );
}
