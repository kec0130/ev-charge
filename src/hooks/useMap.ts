import useSWR from 'swr';
import { useCallback } from 'react';
import type { Coord, NaverMap } from '@/types/map';
import { INITIAL_ZOOM } from '@/constants/map';
const MAP_KEY = '/map';
export default function useMap() {
  const { data: map, mutate } = useSWR<NaverMap>(MAP_KEY);
  const setMap = (value: NaverMap | undefined) => {
    mutate(value, false);
  };
  const moveMap = useCallback(
    (coord: Coord, zoom?: number) => {
      if (typeof naver === 'undefined' || !map) return;
      map.morph(new naver.maps.LatLng(...coord), zoom ?? INITIAL_ZOOM);
    },
    [map],
  );
  return { map, setMap, moveMap };
}
