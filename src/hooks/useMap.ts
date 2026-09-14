import useSWR from 'swr';
import type { Coord, NaverMap } from '@/types/map';
import { INITIAL_ZOOM } from '@/constants/map';
const MAP_KEY = '/map';
export default function useMap() {
  const { data: map, mutate } = useSWR<NaverMap>(MAP_KEY);
  const setMap = (value: NaverMap | undefined) => {
    mutate(value, false);
  };
  const moveMap = (coord: Coord, zoom?: number) => {
    if (typeof naver === 'undefined' || !map) return;
    let center: naver.maps.Coord = new naver.maps.LatLng(...coord);
    const targetZoom = zoom ?? INITIAL_ZOOM;
    if (window.matchMedia('(max-width: 767px)').matches) {
      const height = document.querySelector('.map-workspace')?.clientHeight || 0;
      const projection = map.getProjection();
      const point = projection.fromCoordToOffset(center);
      const offset = ((height * 0.42) / 2) * Math.pow(2, map.getZoom() - targetZoom);
      center = projection.fromOffsetToCoord(new naver.maps.Point(point.x, point.y + offset));
    }
    map.morph(center, targetZoom);
  };
  return { map, setMap, moveMap };
}
