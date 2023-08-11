import { useEffect } from 'react';

import { Coord, MarkerType, NaverMap } from '@/types/map';
import { INITIAL_ZOOM } from '@/constants/map';
import useStation from '@/hooks/useStation';
import useMap from '@/hooks/useMap';

interface Props {
  map?: NaverMap;
  coord: Coord;
  type: MarkerType;
  id?: string;
}

export default function Marker({ map, coord, type, id }: Props) {
  const { setStationId, clearStationId } = useStation();
  const { moveMap } = useMap();

  const markerIcons: Record<MarkerType, naver.maps.ImageIcon> = {
    default: {
      url: '/images/markers/default.png',
      scaledSize: new naver.maps.Size(24, 32),
    },
    selected: {
      url: '/images/markers/default.png',
      scaledSize: new naver.maps.Size(36, 44),
    },
    currentLocation: {
      url: '/images/markers/current-location.png',
      scaledSize: new naver.maps.Size(24, 24),
    },
  };

  const handleMarkerClick = () => {
    if (!id) return;
    if (type === 'selected') {
      clearStationId();
      return;
    }
    map?.getZoom()! < INITIAL_ZOOM - 1 && moveMap(coord);
    setStationId(id);
  };

  useEffect(() => {
    const markerOptions: naver.maps.MarkerOptions = {
      map,
      position: new naver.maps.LatLng(...coord),
      icon: markerIcons[type],
      zIndex: type === 'selected' ? 1 : 0,
    };

    const marker = new naver.maps.Marker(markerOptions);

    naver.maps.Event.addListener(marker, 'click', handleMarkerClick);

    return () => {
      marker.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, type]);

  return <></>;
}
