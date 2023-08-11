import { useEffect } from 'react';
import { Box, useTheme } from '@chakra-ui/react';

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
  const { stationId, clearStationId } = useStation();
  const { districtCode } = useDistrict();
  const { chargers } = useChargers(districtCode || '');
  const theme = useTheme();

  useEffect(() => {
    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(...currentLocation),
      zoom: INITIAL_ZOOM,
      minZoom: 12,
      maxZoom: 18,
      scaleControl: false,
      mapDataControl: true,
      zoomControl: false,
    };

    const map = new naver.maps.Map(MAP_ID, mapOptions);
    setMap(map);

    if (!isLocationFound) return;
    moveMap(currentLocation);
    reverseGeocode(currentLocation);

    const dragListener = naver.maps.Event.addListener(map, 'dragend', () => {
      const { x, y } = map.getCenter();
      reverseGeocode([y, x]);
    });

    const clickListener = naver.maps.Event.addListener(map, 'click', () => {
      clearStationId();
    });

    return () => {
      map.destroy();
      naver.maps.Event.removeListener([dragListener, clickListener]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, isLocationFound]);

  return (
    <Box id={MAP_ID} sx={{ w: '100%', h: theme.sizes.mapHeight }}>
      {isLocationFound && <Marker map={map} coord={currentLocation} type='currentLocation' />}
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
    </Box>
  );
}
