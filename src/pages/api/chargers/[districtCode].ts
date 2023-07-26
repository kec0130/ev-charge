import type { NextApiRequest, NextApiResponse } from 'next';
import { getChargersAPI } from '@/services/charger';
import { Charger } from '@/types/charger';

interface Data {
  data: Charger[];
}

interface Error {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const { districtCode } = req.query;

  if (typeof districtCode !== 'string') {
    res.status(400).json({ message: 'Bad Request' });
    return;
  }

  const chargers = await getChargersAPI(parseInt(districtCode));
  res.status(200).json({ data: chargers.items.item });
}
