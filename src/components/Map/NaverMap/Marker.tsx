import { useEffect } from 'react';

import { Coord, MarkerType, NaverMap } from '@/types/map';
import { INITIAL_ZOOM, MARKER_IMAGE, MARKER_TYPE } from '@/constants/map';
import useStation from '@/hooks/useStation';
import useMap from '@/hooks/useMap';

interface Props {
  map?: NaverMap;
  coord: Coord;
  type?: MarkerType;
  id?: string;
  isSelected?: boolean;
  isCurrentLocation?: boolean;
}

export default function Marker({ map, coord, type, id, isSelected, isCurrentLocation }: Props) {
  const { setStationId, clearStationId } = useStation();
  const { moveMap } = useMap();

  const handleMarkerClick = () => {
    if (!id || isCurrentLocation) return;
    if (isSelected) {
      clearStationId();
      return;
    }
    map?.getZoom()! < INITIAL_ZOOM - 1 && moveMap(coord);
    setStationId(id);
  };

  useEffect(() => {
    const markerIcon: naver.maps.ImageIcon = isCurrentLocation
      ? {
          url: MARKER_IMAGE.CURRENT_LOCATION,
          scaledSize: new naver.maps.Size(24, 24),
        }
      : {
          url: MARKER_IMAGE[MARKER_TYPE[type!]],
          scaledSize: new naver.maps.Size(isSelected ? [36, 44] : [24, 32]),
        };

    const markerOptions: naver.maps.MarkerOptions = {
      map,
      position: new naver.maps.LatLng(...coord),
      icon: markerIcon,
      zIndex: isSelected ? 1 : 0,
    };

    const marker = new naver.maps.Marker(markerOptions);

    naver.maps.Event.addListener(marker, 'click', handleMarkerClick);

    return () => {
      marker.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isSelected]);

  return <></>;
}
