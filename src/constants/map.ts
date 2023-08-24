import { Coord } from '@/types/map';

export const MAP_ID = 'map';
export const INITIAL_ZOOM = 16;
export const INITIAL_CENTER: Coord = [37.5666103, 126.9783882]; // 서울시청
export const INITIAL_DISTRICT_CODE = '11140'; // 중구

export const MARKER_TYPE = {
  AVAILABLE_FAST: 0,
  AVAILABLE_SLOW: 1,
  UNAVAILABLE_FAST: 2,
  UNAVAILABLE_SLOW: 3,
} as const;

export type MarkerType = (typeof MARKER_TYPE)[keyof typeof MARKER_TYPE];

export const MARKER_IMAGES = [
  '/images/markers/available-fast.png',
  '/images/markers/available-slow.png',
  '/images/markers/unavailable-fast.png',
  '/images/markers/unavailable-slow.png',
  '/images/markers/current-location.png',
];
