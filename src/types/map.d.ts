type Lat = number;
type Lng = number;
export type Coord = [Lat, Lng];

export type NaverMap = naver.maps.Map;

export interface FilterOption {
  onlyPublic: boolean;
  onlyAvailable: boolean;
  onlyFastCharger: boolean;
}

export type FilterType = keyof FilterOption;
