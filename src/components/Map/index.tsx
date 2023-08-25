import { Coord } from '@/types/map';
import useMap from '@/hooks/useMap';
import useStation from '@/hooks/useStation';
import useDistrict from '@/hooks/useDistrict';
import useChargers from '@/hooks/useChargers';
import useFilters from '@/hooks/useFilters';

import NaverMap from './NaverMap';
import Marker from './NaverMap/Marker';
import OptionControl from './OptionControl';

interface Props {
  isLoadingLocation: boolean;
  currentLocation: Coord;
}

export default function Map({ isLoadingLocation, currentLocation }: Props) {
  const { map } = useMap();
  const { stationId } = useStation();
  const { districtCode } = useDistrict();
  const { filterOption } = useFilters();
  const { data } = useChargers(districtCode || '', filterOption);

  return (
    <>
      <OptionControl currentLocation={currentLocation} />
      <NaverMap isLoadingLocation={isLoadingLocation} currentLocation={currentLocation}>
        {!isLoadingLocation && <Marker map={map} coord={currentLocation} isCurrentLocation />}
        {data &&
          data.stations.map(({ lat, lng, statId, markerType }) => (
            <Marker
              map={map}
              coord={[parseFloat(lat), parseFloat(lng)]}
              type={markerType}
              isSelected={stationId === statId}
              id={statId}
              key={statId}
            />
          ))}
      </NaverMap>
    </>
  );
}
