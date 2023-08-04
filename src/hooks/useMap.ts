import useSWR from 'swr';
import { Coord, NaverMap } from '@/types/map';
import { INITIAL_ZOOM } from '@/constants/map';

export const MAP_KEY = '/map';

const useMap = () => {
  const { data: map, mutate } = useSWR<NaverMap>(MAP_KEY);

  const setMap = (map: NaverMap) => {
    mutate(map);
  };

  const moveMap = (coord: Coord, zoom?: number) => {
    map?.morph(new naver.maps.LatLng(...coord), zoom ?? INITIAL_ZOOM);
  };

  return { map, setMap, moveMap };
};

export default useMap;
