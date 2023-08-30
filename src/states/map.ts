import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { Coord } from '@/types/map';
import { INITIAL_CENTER } from '@/constants/map';

export const currentDistrictAtom = atomWithReset('');

export const currentStationAtom = atomWithReset('');

export const currentLocationAtom = atom<Coord>(INITIAL_CENTER);

export const isLoadingLocationAtom = atom(true);
