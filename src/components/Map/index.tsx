import { Coord } from '@/types/map';
import useMap from '@/hooks/useMap';
import useCurrentStation from '@/hooks/useCurrentStation';
import useChargers from '@/hooks/useChargers';

import NaverMap from './NaverMap';
import Marker from './NaverMap/Marker';
import OptionControl from './OptionControl';

interface Props {
  isLoadingLocation: boolean;
  currentLocation: Coord;
}

export default function Map({ isLoadingLocation, currentLocation }: Props) {
  const { map } = useMap();
  const { currentStation } = useCurrentStation();
  const { data } = useChargers();

  return (
    <>
      <OptionControl />
      <NaverMap>
        {!isLoadingLocation && <Marker map={map} coord={currentLocation} isCurrentLocation />}
        {data &&
          data.stations.map(({ lat, lng, statId, markerType }) => (
            <Marker
              map={map}
              coord={[parseFloat(lat), parseFloat(lng)]}
              type={markerType}
              isSelected={statId === currentStation}
              id={statId}
              key={statId}
            />
          ))}
      </NaverMap>
    </>
  );
}
