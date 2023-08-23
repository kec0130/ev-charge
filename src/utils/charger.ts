import { ChargerStatus } from '@/types/charger';

export function isFastCharge(output: string) {
  return parseInt(output) >= 50;
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
