import axios from 'axios';
import { ChargerAPIRes } from '@/types/charger';

interface ChargerAPIParams {
  districtCode?: string;
  stationId?: string;
}

const api = axios.create({
  baseURL: 'http://apis.data.go.kr/B552584/EvCharger',
});

export const getChargersAPI = async ({ districtCode, stationId }: ChargerAPIParams) => {
  const res = await api.get<ChargerAPIRes>('/getChargerInfo', {
    params: {
      serviceKey: process.env.NEXT_PUBLIC_API_SERVICE_KEY,
      numOfRows: 10000,
      pageNo: 1,
      dataType: 'JSON',
      zscode: districtCode,
      statId: stationId,
    },
  });
  return res.data;
};
