import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { Coord, FilterOption } from '@/types/map';
import { INITIAL_CENTER } from '@/constants/map';

export const currentDistrictAtom = atomWithReset('');

export const currentStationAtom = atomWithReset('');

export const currentLocationAtom = atom<Coord>(INITIAL_CENTER);

export const isLoadingLocationAtom = atom(true);

export const currentLocationDistrictAtom = atom('');

export const showNearbyStationsAtom = atom(
  (get) => get(currentDistrictAtom) === get(currentLocationDistrictAtom)
);

export const filterOptionAtom = atomWithReset<FilterOption>({
  onlyAvailable: false,
  onlyFastCharger: false,
});
