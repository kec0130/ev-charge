import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { Coord, NaverMap } from '@/types/map';
import { INITIAL_ZOOM, MARKER_IMAGES, MarkerType } from '@/constants/map';
import { currentStationAtom } from '@/states/map';
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
  const setCurrentStation = useSetAtom(currentStationAtom);
  const resetCurrentStation = useResetAtom(currentStationAtom);
  const { moveMap } = useMap();

  const handleMarkerClick = () => {
    if (!id || isCurrentLocation) return;
    if (isSelected) {
      resetCurrentStation();
      return;
    }

    if (map?.getZoom()! < INITIAL_ZOOM) {
      moveMap(coord);
    }
    setCurrentStation(id);
  };

  useEffect(() => {
    const markerIcon: naver.maps.ImageIcon = isCurrentLocation
      ? {
          url: MARKER_IMAGES[MARKER_IMAGES.length - 1],
          scaledSize: new naver.maps.Size(24, 24),
        }
      : {
          url: MARKER_IMAGES[type!],
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
