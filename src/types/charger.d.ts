import { CHARGER_TYPE, STATUS } from '@/constants/chargerCode';

export interface ChargerAPIRes {
  resultMsg: string;
  totalCount: number;
  items: {
    item: ChargerDTO[];
  };
  pageNo: number;
  resultCode: string;
  numOfRows: number;
}

export interface ChargerDTO {
  statNm: string;
  statId: string;
  chgerId: string;
  chgerType: ChargerType;
  addr: string;
  location: string;
  useTime: string;
  lat: string;
  lng: string;
  busiId: string;
  bnm: string;
  busiNm: string;
  busiCall: string;
  stat: ChargerStatus;
  statUpdDt: string;
  lastTsdt: string;
  lastTedt: string;
  nowTsdt: string;
  powerType: string;
  output: string;
  method: ChargerMethod;
  zcode: string;
  zscode: string;
  kind: string;
  kindDetail: string;
  parkingFree: Boolean;
  note: string;
  limitYn: Boolean;
  limitDetail: string;
  delYn: Boolean;
  delDetail: string;
  trafficYn: Boolean;
}

type ChargerType = keyof typeof CHARGER_TYPE;
type ChargerStatus = keyof typeof STATUS;
type ChargerMethod = '단독' | '동시';
type Boolean = 'Y' | 'N';

export interface ChargerDataRes {
  data: ChargerByStation;
  stationCount: number;
}

export interface ChargerByStation {
  [statId: string]: ChargerDTO[];
}

export interface Error {
  message: string;
}

export interface StationListRes {
  stations: StationSimpleDTO[];
  stationCount: number;
  chargerCount: number;
}

export interface StationSimpleDTO {
  statId: string;
  statNm: string;
  addr: string;
  lat: string;
  lng: string;
  isAvailable: boolean;
  hasFastCharger: boolean;
}

export interface StationDetailRes {
  statId: string;
  statNm: string;
  addr: string;
  location: string;
  useTime: string;
  bnm: string;
  busiCall: string;
  kindDetail: string;
  parkingFree: Boolean;
  note: string;
  limitYn: Boolean;
  limitDetail: string;
  delYn: Boolean;
  delDetail: string;
  chargers: ChargerSimpleDTO[];
  chargerCount: number;
  availableChargerCount: number;
}

export interface ChargerSimpleDTO {
  chgerId: string;
  chgerType: ChargerType;
  stat: ChargerStatus;
  statUpdDt: string;
  lastTsdt: string;
  lastTedt: string;
  nowTsdt: string;
  output: string;
}
