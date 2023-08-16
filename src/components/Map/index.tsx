import { Coord } from '@/types/map';
import useMap from '@/hooks/useMap';
import useStation from '@/hooks/useStation';
import useDistrict from '@/hooks/useDistrict';
import useChargers from '@/hooks/useChargers';

import Marker from './NaverMap/Marker';
import NaverMap from './NaverMap';
import AddressSelector from './AddressSelector';

interface Props {
  isLoadingLocation: boolean;
  currentLocation: Coord;
}

export default function Map({ isLoadingLocation, currentLocation }: Props) {
  const { map } = useMap();
  const { stationId } = useStation();
  const { districtCode } = useDistrict();
  const { chargers } = useChargers(districtCode || '');

  return (
    <>
      <AddressSelector currentLocation={currentLocation} />
      <NaverMap isLoadingLocation={isLoadingLocation} currentLocation={currentLocation}>
        {!isLoadingLocation && <Marker map={map} coord={currentLocation} type='currentLocation' />}
        {chargers &&
          Object.keys(chargers.data).map((id) => {
            const { lat, lng } = chargers.data[id][0];
            return (
              <Marker
                map={map}
                coord={[parseFloat(lat), parseFloat(lng)]}
                type={stationId === id ? 'selected' : 'default'}
                id={id}
                key={id}
              />
            );
          })}
      </NaverMap>
    </>
  );
}
