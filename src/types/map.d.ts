type Lat = number;
type Lng = number;
export type Coord = [Lat, Lng];

export type NaverMap = naver.maps.Map;

export type MarkerType =
  | 'CURRENT_LOCATION'
  | 'AVAILABLE_FAST'
  | 'AVAILABLE_SLOW'
  | 'UNAVAILABLE_FAST'
  | 'UNAVAILABLE_SLOW';
