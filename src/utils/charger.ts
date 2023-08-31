import { MARKER_TYPE, MarkerType } from '@/constants/map';
import { ChargerStatus, ChargerType } from '@/types/charger';
import { Coord } from '@/types/map';

export function isFastCharge(chargerType: ChargerType) {
  return chargerType !== '02';
}

export function isAvailable(stat: ChargerStatus) {
  return stat === '2';
}

export function removeNullString(text: string) {
  return text.replace('null', '');
}

export function convertToBoolean(text: string) {
  return text === 'Y';
}

export function convertToBooleanOrNull(text: string) {
  return text === 'Y' ? true : text === 'N' ? false : null;
}

export function convertUseTime(useTime: string) {
  return useTime.startsWith('24') ? '24시간' : removeNullString(useTime);
}

export function getMarkerType(availableCount: number, hasFastCharger: boolean): MarkerType {
  if (availableCount > 0) {
    return hasFastCharger ? MARKER_TYPE.AVAILABLE_FAST : MARKER_TYPE.AVAILABLE_SLOW;
  }
  return hasFastCharger ? MARKER_TYPE.UNAVAILABLE_FAST : MARKER_TYPE.UNAVAILABLE_SLOW;
}

export function haversineDistance(currentLocation: Coord, targetLocation: Coord) {
  const [currentLat, currentLng] = currentLocation;
  const [targetLat, targetLng] = targetLocation;

  // Radius of Earth in kilometers
  const R = 6371;

  // To radians
  const dLat = toRadians(targetLat - currentLat);
  const dLon = toRadians(targetLng - currentLng);

  // Calculate a
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(currentLat)) *
      Math.cos(toRadians(targetLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // Calculate c
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate distance in kilometers
  const distance = R * c;

  return parseFloat(distance.toFixed(3));
}

// Convert degrees to radians
function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function convertDistance(distance: number) {
  // Convert to meters if distance < 1 km
  if (distance < 1) {
    return `${distance * 1000}m`;
  }
  return `${parseFloat(distance.toFixed(1))}km`;
}

export function convertToCoord(lat: string, lng: string): Coord {
  return [parseFloat(lat), parseFloat(lng)];
}
