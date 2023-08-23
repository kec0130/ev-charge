import { Coord } from '@/types/map';

export const MAP_ID = 'map';
export const INITIAL_ZOOM = 16;
export const INITIAL_CENTER: Coord = [37.5666103, 126.9783882]; // 서울시청
export const INITIAL_DISTRICT_CODE = '11140'; // 중구

export const MARKER_TYPE = {
  0: 'AVAILABLE_FAST',
  1: 'AVAILABLE_SLOW',
  2: 'UNAVAILABLE_FAST',
  3: 'UNAVAILABLE_SLOW',
} as const;

export const MARKER_IMAGE = {
  AVAILABLE_FAST: '/images/markers/available-fast.png',
  AVAILABLE_SLOW: '/images/markers/available-slow.png',
  UNAVAILABLE_FAST: '/images/markers/unavailable-fast.png',
  UNAVAILABLE_SLOW: '/images/markers/unavailable-slow.png',
  CURRENT_LOCATION: '/images/markers/current-location.png',
};
