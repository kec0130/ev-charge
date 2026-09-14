import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CITY_CODE, DISTRICT_CODE } from '../src/constants/chargerCode';
import { LEGACY_DISTRICT_CODES } from '../src/constants/regionAliases';
import { resolveDistrictCode, toCurrentDistrictCode } from '../src/utils/regions';

const region = (city: string, district: string, id?: string) => ({
  code: id ? { id } : undefined,
  region: { area1: { name: city }, area2: { name: district } },
});

test('integrated province contains all 27 districts without the retired provinces', () => {
  assert.equal(CITY_CODE['12'], '전남광주통합특별시');
  assert.equal(CITY_CODE['29'], undefined);
  assert.equal(CITY_CODE['46'], undefined);
  assert.equal(Object.keys(DISTRICT_CODE).filter((code) => code.startsWith('12')).length, 27);
  assert.equal(DISTRICT_CODE['12210'], '동구');
  assert.equal(DISTRICT_CODE['12190'], '광양시');
  assert.equal(DISTRICT_CODE['12870'], '신안군');
});

test('actual Naver legal codes resolve to the current charger districts', () => {
  for (const [name, id, expected] of [
    ['동구', '1221011800', '12210'],
    ['광산구', '1233010800', '12330'],
    ['목포시', '1211010100', '12110'],
    ['여수시', '1213012800', '12130'],
  ]) {
    assert.equal(resolveDistrictCode(region('전남광주통합특별시', name, id)), expected);
  }
});

test('old and abbreviated province names still identify the correct district', () => {
  assert.equal(resolveDistrictCode(region('광주광역시', '동구', '2911011800')), '12210');
  assert.equal(resolveDistrictCode(region('광주광역시', '서구')), '12240');
  assert.equal(resolveDistrictCode(region('전라남도', '광양시', '4623010600')), '12190');
  assert.equal(resolveDistrictCode(region('전남광주특별시', '남구')), '12270');
  assert.equal(resolveDistrictCode(region('전남광주', '북구')), '12300');
});

test('duplicate district names never fall back to another province', () => {
  assert.equal(resolveDistrictCode(region('전남광주통합특별시', '동구')), '12210');
  assert.equal(resolveDistrictCode(region('부산광역시', '동구')), '26170');
  assert.equal(resolveDistrictCode(region('대구광역시', '동구')), '27140');
  assert.equal(resolveDistrictCode(region('대전광역시', '동구')), '30110');
  assert.equal(resolveDistrictCode(region('알 수 없는 시도', '동구')), undefined);
  assert.equal(resolveDistrictCode(region('', '동구')), undefined);
  assert.equal(resolveDistrictCode(region('전남광주통합특별시', '중구')), undefined);
});

test('Gyeonggi Gwangju is separate and non-autonomous wards keep their city query', () => {
  assert.equal(resolveDistrictCode(region('경기도', '광주시', '4161010100')), '41610');
  assert.equal(
    resolveDistrictCode(region('전북특별자치도', '전주시 완산구', '5211114700')),
    '52110'
  );
  assert.equal(resolveDistrictCode(region('전라북도', '전주시 덕진구', '4511310100')), '52110');
  assert.equal(resolveDistrictCode(region('경기도', '수원시 팔달구', '4111512000')), '41110');
  assert.equal(resolveDistrictCode(region('세종특별자치시', '', '3611031000')), '36110');
});

test('legacy API codes map to valid current districts, including non-prefix replacements', () => {
  assert.equal(toCurrentDistrictCode('29110'), '12210');
  assert.equal(toCurrentDistrictCode('46230'), '12190');
  assert.equal(toCurrentDistrictCode('46770'), '12740');
  assert.equal(toCurrentDistrictCode('45110'), '52110');
  assert.equal(toCurrentDistrictCode('12210'), '12210');
  assert.equal(toCurrentDistrictCode('26170'), '26170');
  for (const [old, current] of Object.entries(LEGACY_DISTRICT_CODES)) {
    assert.equal(DISTRICT_CODE[old], undefined);
    assert.ok(DISTRICT_CODE[current]);
    assert.equal(toCurrentDistrictCode(current), current);
  }
});
