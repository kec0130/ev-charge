import type { NextApiRequest, NextApiResponse } from 'next';
import { getChargersAPI } from '@/services/charger';
import { ChargerByStation, ChargerDataRes, Error } from '@/types/charger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChargerDataRes | Error>
) {
  const { districtCode } = req.query;

  if (typeof districtCode !== 'string') {
    res.status(400).json({ message: 'Bad Request' });
    return;
  }

  const chargers = await getChargersAPI({ districtCode });

  const chargerByStation = chargers.items.item.reduce<ChargerByStation>((acc, item) => {
    if (!acc[item.statId]) {
      acc[item.statId] = [item];
    } else {
      acc[item.statId] = [...acc[item.statId], item];
    }
    return acc;
  }, {});

  const stationCount = Object.keys(chargerByStation).length;

  res.status(200).json({ data: chargerByStation, stationCount });
}
