import { CHARGER_TYPE, STATUS } from '@/constants/chargerCode';

export interface ChargerResponse {
  resultMsg: string;
  totalCount: number;
  items: {
    item: Charger[];
  };
  pageNo: number;
  resultCode: string;
  numOfRows: number;
}

export interface Charger {
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
