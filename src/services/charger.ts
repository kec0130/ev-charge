import { ChargerResponse } from '@/types/charger';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://apis.data.go.kr/B552584/EvCharger',
});

export const getChargersAPI = async (districtCode: number) => {
  const res = await api.get<ChargerResponse>('/getChargerInfo', {
    params: {
      serviceKey: process.env.NEXT_PUBLIC_API_SERVICE_KEY,
      numOfRows: 10000,
      pageNo: 1,
      dataType: 'JSON',
      zscode: districtCode,
    },
  });
  return res.data;
};
