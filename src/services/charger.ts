import axios from 'axios';
import { ChargerAPIRes } from '@/types/charger';

const api = axios.create({
  baseURL: 'http://apis.data.go.kr/B552584/EvCharger',
});

export const getChargersAPI = async (districtCode: string) => {
  const res = await api.get<ChargerAPIRes>('/getChargerInfo', {
    params: {
      serviceKey: process.env.NEXT_PUBLIC_API_SERVICE_KEY,
      numOfRows: 9999,
      pageNo: 1,
      dataType: 'JSON',
      zscode: districtCode,
    },
  });
  return res.data;
};
