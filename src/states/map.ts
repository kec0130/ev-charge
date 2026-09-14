import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { Coord, FilterOption } from '@/types/map';
import { INITIAL_CENTER, INITIAL_DISTRICT_CODE } from '@/constants/map';

export const currentDistrictAtom = atomWithReset(INITIAL_DISTRICT_CODE);

export const currentStationAtom = atomWithReset('');

export type StationSheetState = 'collapsed' | 'preview' | 'expanded';
export const stationSheetAtom = atom<StationSheetState>('collapsed');

export const currentLocationAtom = atom<Coord>(INITIAL_CENTER);

export const isLoadingLocationAtom = atom(true);

export const isLocationOffAtom = atom(false);

export const currentLocationDistrictAtom = atom('');

export const showNearbyStationsAtom = atom(
  (get) => !get(isLocationOffAtom) && get(currentDistrictAtom) === get(currentLocationDistrictAtom),
);

export const filterOptionAtom = atomWithReset<FilterOption>({
  onlyPublic: true,
  onlyAvailable: false,
  onlyFastCharger: false,
});
