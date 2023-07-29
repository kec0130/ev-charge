import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

import { Coord } from '@/types/map';
import { CURRENT_DISTRICT_KEY, CURRENT_STATION_KEY, INITIAL_ZOOM, MAP_ID } from '@/constants/map';
import useReverseGeocode from '@/hooks/useReverseGeocode';
import useChargers from '@/hooks/useChargers';
import Marker from './Marker';

interface Props {
  currentLocation: Coord;
  isLocationFound: boolean;
}

export default function Map({ currentLocation, isLocationFound }: Props) {
  const [map, setMap] = useState<naver.maps.Map>();
  const { data: districtCode } = useSWR(CURRENT_DISTRICT_KEY);
  const { chargers } = useChargers(districtCode);
  const { reverseGeocode } = useReverseGeocode();

  useEffect(() => {
    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(...currentLocation),
      zoom: INITIAL_ZOOM,
      minZoom: 12,
      scaleControl: true,
      mapDataControl: true,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    };

    const map = new naver.maps.Map(MAP_ID, mapOptions);
    setMap(map);

    map?.morph(new naver.maps.LatLng(...currentLocation), INITIAL_ZOOM);

    if (!isLocationFound) return;
    reverseGeocode(currentLocation);

    const listener = naver.maps.Event.addListener(map, 'dragend', () => {
      const { x, y } = map.getCenter();
      reverseGeocode([y, x]);
    });

    return () => {
      map?.destroy();
      naver.maps.Event.removeListener(listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, isLocationFound]);

  return (
    <div id={MAP_ID} style={{ width: '100%', height: '50vh' }}>
      {isLocationFound && <Marker map={map} coord={currentLocation} />}
      {chargers &&
        Object.keys(chargers.data).map((key) => {
          const { lat, lng } = chargers.data[key][0];
          return (
            <Marker
              map={map}
              coord={[parseFloat(lat), parseFloat(lng)]}
              onClick={() => mutate(CURRENT_STATION_KEY, key)}
              key={key}
            />
          );
        })}
    </div>
  );
}
