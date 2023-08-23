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
  selected?: boolean;
}

export default function Marker({ map, coord, type, id, selected }: Props) {
  const { setStationId, clearStationId } = useStation();
  const { moveMap } = useMap();

  const markerIcons: Record<MarkerType, naver.maps.ImageIcon> = {
    CURRENT_LOCATION: {
      url: '/images/markers/current-location.png',
      scaledSize: new naver.maps.Size(24, 24),
    },
    AVAILABLE_FAST: {
      url: '/images/markers/available-fast.png',
      scaledSize: new naver.maps.Size(24, 32),
    },
    AVAILABLE_SLOW: {
      url: '/images/markers/available-slow.png',
      scaledSize: new naver.maps.Size(24, 32),
    },
    UNAVAILABLE_FAST: {
      url: '/images/markers/unavailable-fast.png',
      scaledSize: new naver.maps.Size(24, 32),
    },
    UNAVAILABLE_SLOW: {
      url: '/images/markers/unavailable-slow.png',
      scaledSize: new naver.maps.Size(24, 32),
    },
  };

  const handleMarkerClick = () => {
    if (!id) return;
    if (selected) {
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
      icon: {
        ...markerIcons[type],
        scaledSize: selected ? new naver.maps.Size(36, 44) : markerIcons[type].scaledSize,
      },
      zIndex: selected ? 1 : 0,
    };

    const marker = new naver.maps.Marker(markerOptions);

    naver.maps.Event.addListener(marker, 'click', handleMarkerClick);

    return () => {
      marker.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, selected]);

  return <></>;
}
