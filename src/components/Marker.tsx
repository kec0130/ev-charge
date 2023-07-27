import { Coord } from '@/types/map';
import { useEffect } from 'react';

interface Props {
  map?: naver.maps.Map;
  coord: Coord;
  onClick?: () => void;
}

export default function Marker({ map, coord, onClick }: Props) {
  useEffect(() => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(...coord),
      map,
    });

    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [coord, map, onClick]);
  return null;
}
