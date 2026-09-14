import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { ChargerInfoRes, Error } from '@/types/charger';
import { getChargersAPI } from '@/services/charger';
import { buildStations, isValidCoord } from '@/utils/stations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChargerInfoRes | Error>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { districtCode, lat, lng } = req.query;
  if (typeof districtCode !== 'string' || !/^\d{5}$/.test(districtCode) ||
    typeof lat !== 'string' || typeof lng !== 'string' || !lat.trim() || !lng.trim() ||
    !isValidCoord(Number(lat), Number(lng))) {
    res.status(400).json({ message: '올바른 지역 코드와 좌표가 필요합니다.' });
    return;
  }

  try {
    const chargers = await getChargersAPI(districtCode);
    res.status(200).json(buildStations(chargers, [Number(lat), Number(lng)]));
  } catch (error: unknown) {
    // Axios errors include the service key in their config: do not log the full error.
    const timedOut = axios.isAxiosError(error) && error.code === 'ECONNABORTED';
    res.status(timedOut ? 504 : 502).json({
      message: '충전소 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
}
