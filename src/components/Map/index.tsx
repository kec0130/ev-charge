import { useAtomValue } from 'jotai';

import { currentLocationAtom, currentStationAtom, isLoadingLocationAtom } from '@/states/map';
import { convertToCoord } from '@/utils/charger';
import useMap from '@/hooks/useMap';
import useChargers from '@/hooks/useChargers';

import NaverMap from './NaverMap';
import Marker from './NaverMap/Marker';
import OptionControl from './OptionControl';

export default function Map() {
  const currentStation = useAtomValue(currentStationAtom);
  const currentLocation = useAtomValue(currentLocationAtom);
  const isLoadingLocation = useAtomValue(isLoadingLocationAtom);

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
              coord={convertToCoord(lat, lng)}
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
