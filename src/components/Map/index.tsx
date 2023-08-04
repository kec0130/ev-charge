import { useEffect } from 'react';

import { INITIAL_ZOOM, MAP_ID } from '@/constants/map';
import { Coord } from '@/types/map';
import useMap from '@/hooks/useMap';
import useGeocode from '@/hooks/useGeocode';
import useStation from '@/hooks/useStation';
import useDistrict from '@/hooks/useDistrict';
import useChargers from '@/hooks/useChargers';

import Marker from './Marker';

interface Props {
  currentLocation: Coord;
  isLocationFound: boolean;
}

export default function Map({ currentLocation, isLocationFound }: Props) {
  const { map, setMap, moveMap } = useMap();
  const { reverseGeocode } = useGeocode();
  const { setStationId } = useStation();
  const { districtCode } = useDistrict();
  const { chargers } = useChargers(districtCode || '');

  useEffect(() => {
    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(...currentLocation),
      zoom: INITIAL_ZOOM,
      minZoom: 12,
      maxZoom: 18,
      scaleControl: true,
      mapDataControl: true,
      zoomControl: false,
    };

    const map = new naver.maps.Map(MAP_ID, mapOptions);
    setMap(map);

    if (!isLocationFound) return;
    moveMap(currentLocation);
    reverseGeocode(currentLocation);

    const listener = naver.maps.Event.addListener(map, 'dragend', () => {
      const { x, y } = map.getCenter();
      reverseGeocode([y, x]);
    });

    return () => {
      map.destroy();
      naver.maps.Event.removeListener(listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, isLocationFound]);

  return (
    <div id={MAP_ID} style={{ width: '100%', height: '50vh' }}>
      {isLocationFound && <Marker map={map} coord={currentLocation} />}
      {chargers &&
        Object.keys(chargers.data).map((stationId) => {
          const { lat, lng } = chargers.data[stationId][0];
          return (
            <Marker
              map={map}
              coord={[parseFloat(lat), parseFloat(lng)]}
              onClick={() => setStationId(stationId)}
              key={stationId}
            />
          );
        })}
    </div>
  );
}
