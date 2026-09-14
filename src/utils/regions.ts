import { CITY_CODE, DISTRICT_CODE } from '../constants/chargerCode';
import { LEGACY_DISTRICT_CODES } from '../constants/regionAliases';

const CITY_ALIASES: Record<string, string> = {
  전남광주특별시: '12',
  전남광주: '12',
  광주광역시: '12',
  전라남도: '12',
  전라북도: '52',
  전북: '52',
  강원도: '51',
};

export const toCurrentDistrictCode = (code: string): string => LEGACY_DISTRICT_CODES[code] || code;

interface GeocodedRegion {
  code?: { id?: string };
  region?: {
    area1?: { name?: string };
    area2?: { name?: string };
  };
}

export function resolveDistrictCode(result: GeocodedRegion): string | undefined {
  const id = result.code?.id;
  if (id && /^\d{10}$/.test(id)) {
    const district = toCurrentDistrictCode(id.slice(0, 5));
    if (DISTRICT_CODE[district]) return district;
  }

  const cityName = result.region?.area1?.name?.trim();
  if (!cityName) return;
  const city =
    CITY_ALIASES[cityName] || Object.keys(CITY_CODE).find((code) => CITY_CODE[code] === cityName);
  // Never choose a district by name alone: many provinces have a 동구/서구/남구/북구.
  if (!city) return;
  if (city === '36') return '36110';

  // The charger API groups non-autonomous wards under their parent city.
  // For example, Naver's "전주시 완산구" (52111...) is queried as 전주시 (52110).
  const districtName = result.region?.area2?.name?.trim().split(/\s+/)[0];
  if (!districtName) return;
  return Object.keys(DISTRICT_CODE).find(
    (code) => code.startsWith(city) && DISTRICT_CODE[code] === districtName
  );
}
