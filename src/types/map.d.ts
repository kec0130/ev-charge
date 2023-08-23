import { MARKER_TYPE } from '@/constants/map';

type Lat = number;
type Lng = number;
export type Coord = [Lat, Lng];

export type NaverMap = naver.maps.Map;

export type MarkerType = keyof typeof MARKER_TYPE;
