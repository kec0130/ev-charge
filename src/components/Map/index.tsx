import { useAtomValue } from 'jotai';

import { Coord } from '@/types/map';
import { currentStationAtom } from '@/states/map';
import useMap from '@/hooks/useMap';
import useChargers from '@/hooks/useChargers';

import NaverMap from './NaverMap';
import Marker from './NaverMap/Marker';
import OptionControl from './OptionControl';

interface Props {
  isLoadingLocation: boolean;
  currentLocation: Coord;
}

export default function Map({ isLoadingLocation, currentLocation }: Props) {
  const currentStation = useAtomValue(currentStationAtom);
  const { map } = useMap();
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
