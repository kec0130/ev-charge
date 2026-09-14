import type { ChargerDTO, ChargerInfoRes, StationAccess, StationDTO } from '@/types/charger';
import type { Coord, FilterOption } from '@/types/map';
import {
  convertToBooleanOrNull,
  convertUseTime,
  getMarkerType,
  haversineDistance,
  isAvailable,
  isFastCharge,
  removeNullString,
} from './charger';

const NO_RESTRICTION = /^(없음|제한없음|이용제한없음|해당없음|해당사항없음|미해당|무|N|-)$/i;

export function getStationAccess(limitYn: string, limitDetail?: string | null): StationAccess {
  if (limitYn === 'Y') return 'restricted';
  const detail = removeNullString(limitDetail).replace(/\s/g, '');
  // A missing flag or a conflicting description is not proof of public access.
  if (limitYn !== 'N' || (detail && !NO_RESTRICTION.test(detail))) return 'unknown';
  return 'public';
}

function mergeAccess(a: StationAccess, b: StationAccess): StationAccess {
  if (a === 'restricted' || b === 'restricted') return 'restricted';
  if (a === 'unknown' || b === 'unknown') return 'unknown';
  return 'public';
}

export function isValidCoord(lat: number, lng: number) {
  return Number.isFinite(lat) && Number.isFinite(lng) &&
    lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function stationMarker(station: StationDTO, onlyFastCharger = false) {
  const chargers = station.chargers.filter((charger) =>
    !onlyFastCharger || isFastCharge(charger.chgerType)
  );
  const available = chargers.filter((charger) => isAvailable(charger.stat));
  // A busy fast charger must not turn a free slow charger into a free fast marker.
  const hasFast = (available.length ? available : chargers).some((charger) =>
    isFastCharge(charger.chgerType)
  );
  return getMarkerType(available.length, hasFast);
}

export function buildStations(data: ChargerDTO[], currentLocation: Coord): ChargerInfoRes {
  const stationsById = new Map<string, StationDTO>();
  const seenChargers = new Set<string>();

  for (const charger of data) {
    const lat = Number(charger.lat);
    const lng = Number(charger.lng);
    const key = `${charger.statId}:${charger.chgerId}`;
    if (charger.delYn === 'Y' || !charger.statId || !charger.chgerId ||
      !charger.lat?.trim() || !charger.lng?.trim() || !isValidCoord(lat, lng) ||
      (lat === 0 && lng === 0) || seenChargers.has(key)) continue;
    seenChargers.add(key);

    const access = getStationAccess(charger.limitYn, charger.limitDetail);
    let station = stationsById.get(charger.statId);
    if (!station) {
      station = {
        statId: charger.statId,
        statNm: charger.statNm,
        addr: charger.addr,
        lat: charger.lat,
        lng: charger.lng,
        distance: haversineDistance(currentLocation, [lat, lng]),
        location: removeNullString(charger.location),
        useTime: convertUseTime(charger.useTime),
        bnm: removeNullString(charger.bnm),
        busiCall: removeNullString(charger.busiCall),
        kindDetail: removeNullString(charger.kindDetail),
        parkingFree: convertToBooleanOrNull(charger.parkingFree),
        note: removeNullString(charger.note),
        limitDetail: removeNullString(charger.limitDetail),
        access,
        delDetail: '',
        availableCount: 0,
        hasFastCharger: false,
        markerType: 0,
        chargers: [],
      };
      stationsById.set(charger.statId, station);
    } else {
      station.access = mergeAccess(station.access, access);
      const detail = removeNullString(charger.limitDetail);
      if (detail && !station.limitDetail.split(' / ').includes(detail)) {
        station.limitDetail = [station.limitDetail, detail].filter(Boolean).join(' / ');
      }
    }

    station.availableCount += isAvailable(charger.stat) ? 1 : 0;
    station.hasFastCharger ||= isFastCharge(charger.chgerType);
    station.chargers.push({
      chgerId: charger.chgerId,
      chgerType: charger.chgerType,
      stat: charger.stat,
      statUpdDt: charger.statUpdDt,
      lastTedt: charger.lastTedt,
      nowTsdt: charger.nowTsdt,
      output: charger.output,
    });
  }

  const stations = Array.from(stationsById.values())
    .map((station) => ({ ...station, markerType: stationMarker(station) }))
    .sort((a, b) => a.distance - b.distance);
  return {
    stations,
    stationCount: stations.length,
    chargerCount: stations.reduce((count, station) => count + station.chargers.length, 0),
  };
}

export function filterStations(data: ChargerInfoRes, options: FilterOption): ChargerInfoRes {
  const stations = data.stations.filter((station) => {
    if (options.onlyPublic && station.access !== 'public') return false;
    return station.chargers.some((charger) =>
      (!options.onlyAvailable || isAvailable(charger.stat)) &&
      (!options.onlyFastCharger || isFastCharge(charger.chgerType))
    );
  }).map((station) => ({
    ...station,
    markerType: stationMarker(station, options.onlyFastCharger),
  }));

  return {
    stations,
    stationCount: stations.length,
    chargerCount: stations.reduce((count, station) => count + station.chargers.length, 0),
  };
}
