import axios from 'axios';
import { ChargerAPIRes, ChargerDTO } from '@/types/charger';
import { toCurrentDistrictCode } from '../utils/regions';

const PAGE_SIZE = 9999;
const api = axios.create({
  baseURL: 'https://apis.data.go.kr/B552584/EvCharger',
  timeout: 15000,
});

export const getChargersAPI = async (districtCode: string): Promise<ChargerDTO[]> => {
  // Keep the old name as a migration fallback for existing deployments.
  const serviceKey = process.env.EV_CHARGER_SERVICE_KEY || process.env.NEXT_PUBLIC_API_SERVICE_KEY;
  if (!serviceKey) throw new Error('Missing charger API service key');

  const chargers: ChargerDTO[] = [];
  let pageNo = 1;
  do {
    const { data } = await api.get<ChargerAPIRes>('/getChargerInfo', {
      params: {
        serviceKey,
        numOfRows: PAGE_SIZE,
        pageNo,
        dataType: 'JSON',
        zscode: toCurrentDistrictCode(districtCode),
      },
    });
    if (!data || !['00', '0'].includes(String(data.resultCode))) {
      throw new Error('Charger provider returned an unsuccessful response');
    }
    const totalCount = Number(data.totalCount);
    if (!Number.isInteger(totalCount) || totalCount < 0) {
      throw new Error('Charger provider returned an invalid count');
    }
    const item = data.items?.item;
    const page = Array.isArray(item) ? item : item && typeof item === 'object' ? [item] : [];
    chargers.push(...page);
    if (chargers.length >= totalCount) return chargers;
    if (!page.length || pageNo >= 100) {
      throw new Error('Charger provider returned incomplete results');
    }
    pageNo += 1;
  } while (true);
};
