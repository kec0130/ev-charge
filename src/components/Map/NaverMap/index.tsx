import { useEffect } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import { useResetAtom } from 'jotai/utils';

import { INITIAL_CENTER, INITIAL_ZOOM, MAP_ID } from '@/constants/map';
import { currentDistrictAtom, currentStationAtom } from '@/states/map';
import useMap from '@/hooks/useMap';
import useGeocode from '@/hooks/useGeocode';

const NaverMap = ({ children }: { children: React.ReactNode }) => {
  const resetCurrentStation = useResetAtom(currentStationAtom);
  const resetCurrentDistrict = useResetAtom(currentDistrictAtom);

  const { setMap } = useMap();
  const { reverseGeocode } = useGeocode();
  const theme = useTheme();

  useEffect(() => {
    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(...INITIAL_CENTER),
      zoom: INITIAL_ZOOM,
      minZoom: 12,
      maxZoom: 18,
      scaleControl: true,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(MAP_ID, mapOptions);
    setMap(map);

    const dragListener = naver.maps.Event.addListener(map, 'dragend', () => {
      const { x, y } = map.getCenter();
      reverseGeocode([y, x]);
    });

    const clickListener = naver.maps.Event.addListener(map, 'click', () => {
      resetCurrentStation();
    });

    return () => {
      map.destroy();
      naver.maps.Event.removeListener([dragListener, clickListener]);
      resetCurrentStation();
      resetCurrentDistrict();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box id={MAP_ID} sx={{ w: '100%', h: theme.sizes.mapHeight }}>
      {children}
    </Box>
  );
};

export default NaverMap;
