import { ChargerStatus, ChargerType } from '@/types/charger';

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
