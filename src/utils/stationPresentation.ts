import type { StationDTO } from '@/types/charger';
import { isAvailable, isFastCharge } from './charger';

export function getStationAvailability(station: StationDTO, onlyFast = false) {
  const fast = station.chargers.filter((charger) => isFastCharge(charger.chgerType));
  const slow = station.chargers.filter((charger) => charger.chgerType === '02');
  const fastAvailable = fast.filter((charger) => isAvailable(charger.stat)).length;
  const slowAvailable = slow.filter((charger) => isAvailable(charger.stat)).length;
  const state =
    fastAvailable > 0 ? 'fast' : !onlyFast && slowAvailable > 0 ? 'slow' : 'unavailable';
  const available = state === 'fast' ? fastAvailable : state === 'slow' ? slowAvailable : 0;
  const total =
    state === 'fast' || onlyFast
      ? fast.length
      : state === 'slow'
        ? slow.length
        : station.chargers.length;
  const type = state === 'fast' ? '급속' : state === 'slow' ? '완속' : '';
  const label = type ? `${type} ${available}/${total}` : `0/${total}`;
  return {
    state,
    fastTotal: fast.length,
    slowTotal: slow.length,
    fastAvailable,
    slowAvailable,
    available,
    total,
    type,
    label,
  };
}
export function getDirectionsUrl(station: StationDTO) {
  return `https://map.naver.com/v5/directions/-/${encodeURIComponent(station.lng)},${encodeURIComponent(station.lat)},${encodeURIComponent(station.statNm)}/-/car?c=15,0,0,0,dh`;
}
export function escapeMarkup(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
  );
}
export function stationMarkerContent(
  station: StationDTO,
  selected: boolean,
  onlyFast = false,
  showLabel = true,
) {
  const { state, label } = getStationAvailability(station, onlyFast);
  const color = state === 'fast' ? '#147A4B' : state === 'slow' ? '#A5DBB8' : '#939DA3';
  const bolt = state === 'slow' ? '#145B37' : '#FFFFFF';
  return `<button type="button" class="charging-pin${selected ? ' selected' : ''}" aria-label="${escapeMarkup(station.statNm + ', ' + label)}" aria-pressed="${selected}"><svg viewBox="0 0 38 48" aria-hidden="true"><path d="M19 46S2 28 2 19a17 17 0 1 1 34 0c0 9-17 27-17 27Z" fill="${color}" stroke="white" stroke-width="2.5"/><path d="m22 7-12 15h8l-2 11 12-16h-8Z" fill="${bolt}"/></svg>${showLabel || selected ? `<span>${label}</span>` : ''}</button>`;
}
