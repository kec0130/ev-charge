import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  buildStations,
  filterStations,
  getStationAccess,
  isValidCoord,
} from '../src/utils/stations';
import { convertUseTime, isFastCharge, removeNullString } from '../src/utils/charger';
import { MARKER_TYPE } from '../src/constants/map';
import type { ChargerDTO } from '../src/types/charger';
import { getStationAvailability, stationMarkerContent } from '../src/utils/stationPresentation';

const origin: [number, number] = [37.56, 126.97];
const defaults = { onlyPublic: true, onlyAvailable: false, onlyFastCharger: false };
function charger(overrides: Partial<ChargerDTO> = {}): ChargerDTO {
  return {
    statId: 'public',
    statNm: '공영주차장',
    chgerId: '01',
    chgerType: '04',
    lat: '37.56',
    lng: '126.97',
    addr: '서울',
    location: '',
    useTime: '24시간',
    busiId: '',
    bnm: '',
    busiNm: '',
    busiCall: '',
    stat: '2',
    statUpdDt: '',
    lastTsdt: '',
    lastTedt: '',
    nowTsdt: '',
    powerType: '',
    output: '50',
    method: '단독',
    zcode: '11',
    zscode: '11140',
    kind: '',
    kindDetail: '',
    parkingFree: 'N',
    note: '',
    limitYn: 'N',
    limitDetail: '',
    delYn: 'N',
    delDetail: '',
    trafficYn: 'N',
    ...overrides,
  };
}

test('default map excludes restricted, missing and conflicting access information', () => {
  const data = buildStations(
    [
      charger(),
      charger({ statId: 'resident', limitYn: 'Y', limitDetail: '' }),
      charger({ statId: 'conflict', limitYn: 'N', limitDetail: '입주민 전용' }),
      charger({ statId: 'unknown', limitYn: undefined }),
    ],
    origin,
  );
  assert.deepEqual(
    filterStations(data, defaults).stations.map((s) => s.statId),
    ['public'],
  );
  assert.equal(filterStations(data, { ...defaults, onlyPublic: false }).stationCount, 4);
  assert.equal(data.stations.find((s) => s.statId === 'resident')?.access, 'restricted');
});

test('access classification keeps missing details distinct from unrestricted flags', () => {
  assert.equal(getStationAccess('Y', null), 'restricted');
  assert.equal(getStationAccess('', ''), 'unknown');
  assert.equal(getStationAccess('N', 'null'), 'public');
  assert.equal(getStationAccess('N', '해당사항 없음'), 'public');
  assert.equal(getStationAccess('N', '시설 상황에 따라 이용이 제한될 수 있음'), 'unknown');
});

test('restriction on a later charger is preserved regardless of input order', () => {
  const rows = [charger(), charger({ chgerId: '02', limitYn: 'Y', limitDetail: '직원 전용' })];
  for (const input of [rows, [...rows].reverse()]) {
    const data = buildStations(input, origin);
    assert.equal(data.stations[0].access, 'restricted');
    assert.match(data.stations[0].limitDetail, /직원 전용/);
    assert.equal(filterStations(data, defaults).stationCount, 0);
  }
});

test('deleted chargers, duplicate records and invalid map positions are omitted', () => {
  const data = buildStations(
    [
      charger(),
      charger(),
      charger({ chgerId: '02', delYn: 'Y' }),
      charger({ statId: 'deleted', delYn: 'Y' }),
      charger({ statId: 'missing', lat: '' }),
      charger({ statId: 'malformed', lat: '37oops' }),
      charger({ statId: 'out-of-range', lat: '91' }),
      charger({ statId: 'null-island', lat: '0', lng: '0' }),
    ],
    origin,
  );
  assert.equal(data.stationCount, 1);
  assert.equal(data.chargerCount, 1);
  assert.equal(data.stations[0].availableCount, 1);
});

test('available and fast must match the same charger, with an accurate marker', () => {
  const mixed = buildStations(
    [charger({ stat: '3' }), charger({ chgerId: '02', chgerType: '02', stat: '2' })],
    origin,
  );
  assert.equal(mixed.stations[0].markerType, MARKER_TYPE.AVAILABLE_SLOW);
  const fast = filterStations(mixed, { ...defaults, onlyFastCharger: true });
  assert.equal(fast.stations[0].markerType, MARKER_TYPE.UNAVAILABLE_FAST);
  assert.equal(
    filterStations(mixed, {
      ...defaults,
      onlyAvailable: true,
      onlyFastCharger: true,
    }).stationCount,
    0,
  );
  assert.equal(filterStations(mixed, { ...defaults, onlyAvailable: true }).stationCount, 1);
  assert.equal(mixed.stations[0].markerType, MARKER_TYPE.AVAILABLE_SLOW);
});

test('available fast chargers appear when both filters are enabled', () => {
  const data = buildStations([charger()], origin);
  const filtered = filterStations(data, {
    ...defaults,
    onlyAvailable: true,
    onlyFastCharger: true,
  });
  assert.equal(filtered.chargerCount, 1);
  assert.equal(filtered.stations[0].markerType, MARKER_TYPE.AVAILABLE_FAST);
});

test('empty results are valid and station distances stay sorted', () => {
  assert.deepEqual(buildStations([], origin), { stations: [], stationCount: 0, chargerCount: 0 });
  const data = buildStations([charger({ statId: 'far', lat: '38' }), charger()], origin);
  assert.deepEqual(
    data.stations.map((s) => s.statId),
    ['public', 'far'],
  );
});

test('nullable text is safe and operating conditions are not removed', () => {
  assert.equal(removeNullString(null), '');
  assert.equal(removeNullString(undefined), '');
  assert.equal(removeNullString(' null '), '');
  assert.equal(convertUseTime('24시간 (주말 제외)'), '24시간 (주말 제외)');
  assert.equal(isValidCoord(NaN, 127), false);
  assert.equal(isValidCoord(37, 181), false);
  assert.equal(isFastCharge('10' as ChargerDTO['chgerType']), false);
});

test('mixed stations switch marker color and counts when the last fast charger becomes busy', () => {
  const rows = [charger(), charger({ chgerId: '02', chgerType: '02' })];
  const available = buildStations(rows, origin).stations[0];
  assert.equal(getStationAvailability(available).label, '급속 1/1');
  assert.match(stationMarkerContent(available, false), /#147A4B/);
  const busyFast = buildStations([{ ...rows[0], stat: '3' }, rows[1]], origin).stations[0];
  assert.equal(getStationAvailability(busyFast).label, '완속 1/1');
  assert.match(stationMarkerContent(busyFast, false), /#A5DBB8/);
  assert.equal(getStationAvailability(busyFast, true).label, '0/1');
  assert.match(stationMarkerContent(busyFast, false, true), /#939DA3/);
});

test('slow-only and unknown-type stations have distinct availability labels', () => {
  const slow = buildStations([charger({ chgerType: '02' })], origin).stations[0];
  assert.equal(getStationAvailability(slow).state, 'slow');
  const unknown = buildStations([charger({ chgerType: '99' as ChargerDTO['chgerType'] })], origin)
    .stations[0];
  assert.equal(getStationAvailability(unknown).state, 'unavailable');
  assert.equal(unknown.markerType, MARKER_TYPE.UNAVAILABLE_SLOW);
});

test('all-busy mixed stations use a neutral marker with the complete charger count', () => {
  const station = buildStations(
    [charger({ stat: '3' }), charger({ chgerId: '02', chgerType: '02', stat: '3' })],
    origin,
  ).stations[0];
  assert.equal(getStationAvailability(station).label, '0/2');
  assert.match(stationMarkerContent(station, false), /#939DA3/);
});

test('provider station names are escaped in interactive marker markup', () => {
  const station = buildStations([charger({ statNm: '\" onfocus=\"alert(1)<img>' })], origin)
    .stations[0];
  const markup = stationMarkerContent(station, true);
  assert.ok(!markup.includes('<img>'));
  assert.match(markup, /&quot; onfocus=&quot;alert\(1\)&lt;img&gt;/);
  assert.match(markup, /aria-pressed="true"/);
});
