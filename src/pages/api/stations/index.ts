import type { NextApiRequest, NextApiResponse } from 'next';
import { Error, StationList, StationSimpleDTO } from '@/types/charger';
import { getChargersAPI } from '@/services/charger';
import { isFastCharge } from '@/utils/charger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StationList | Error>
) {
  const { districtCode } = req.query;

  if (typeof districtCode !== 'string') {
    res.status(400).json({ message: 'Bad Request' });
    return;
  }

  const chargerData = await getChargersAPI({ districtCode });

  const {
    totalCount,
    items: { item: data },
  } = chargerData;

  const stations = data.reduce<StationSimpleDTO[]>((acc, cur) => {
    const { statId, statNm, addr, lat, lng, stat, output } = cur;
    const existingStation = acc.find((station) => station.statId === statId);
    const isAvailable = stat === '2';
    const hasFastCharger = isFastCharge(output);

    if (!existingStation) {
      acc.push({
        statId,
        statNm,
        addr,
        lat,
        lng,
        isAvailable,
        hasFastCharger,
      });
    } else {
      existingStation.isAvailable = existingStation.isAvailable || isAvailable;
      existingStation.hasFastCharger = existingStation.hasFastCharger || hasFastCharger;
    }

    return acc;
  }, []);

  res.status(200).json({
    chargerCount: totalCount,
    stationCount: stations.length,
    stations,
  });
}
