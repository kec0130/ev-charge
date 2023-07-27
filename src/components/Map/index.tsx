import { useEffect, useState } from 'react';
import { INITIAL_ZOOM, MAP_ID } from '@/constants/map';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useReverseGeocode from '@/hooks/useReverseGeocode';
import useChargers from '@/hooks/useChargers';
import Marker from './Marker';

export default function Map() {
  const [map, setMap] = useState<naver.maps.Map>();
  const { currentLocation, isLocationFound } = useCurrentLocation();
  const { districtCode, reverseGeocode } = useReverseGeocode();
  const { chargers } = useChargers(districtCode);

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
              onClick={() => console.log(key)}
              key={key}
            />
          );
        })}
    </div>
  );
}
