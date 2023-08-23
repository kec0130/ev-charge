import { Coord, MarkerType } from '@/types/map';
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

  const getMarkerType = (availableCount: number, hasFastCharger: boolean): MarkerType => {
    return `${availableCount ? 'AVAILABLE' : 'UNAVAILABLE'}_${hasFastCharger ? 'FAST' : 'SLOW'}`;
  };

  return (
    <>
      <AddressSelector currentLocation={currentLocation} />
      <NaverMap isLoadingLocation={isLoadingLocation} currentLocation={currentLocation}>
        {!isLoadingLocation && <Marker map={map} coord={currentLocation} type='CURRENT_LOCATION' />}
        {data &&
          data.stations.map(({ lat, lng, statId, availableCount, hasFastCharger }) => (
            <Marker
              map={map}
              coord={[parseFloat(lat), parseFloat(lng)]}
              type={getMarkerType(availableCount, hasFastCharger)}
              selected={stationId === statId}
              id={statId}
              key={statId}
            />
          ))}
      </NaverMap>
    </>
  );
}
