import type { NextApiRequest, NextApiResponse } from 'next';
import { ChargerSimpleDTO, Error, StationDetailRes } from '@/types/charger';
import { getChargersAPI } from '@/services/charger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StationDetailRes | Error>
) {
  const { stationId } = req.query;

  if (typeof stationId !== 'string') {
    res.status(400).json({ message: 'Bad Request' });
    return;
  }

  const chargerData = await getChargersAPI({ stationId });

  const {
    items: { item },
  } = chargerData;

  const {
    statId,
    statNm,
    addr,
    location,
    useTime,
    bnm,
    busiCall,
    kindDetail,
    parkingFree,
    note,
    limitYn,
    limitDetail,
    delYn,
    delDetail,
  } = item[0];

  const chargers = item.reduce<ChargerSimpleDTO[]>((acc, cur) => {
    const { chgerId, chgerType, stat, statUpdDt, lastTsdt, lastTedt, nowTsdt, output } = cur;
    return [...acc, { chgerId, chgerType, stat, statUpdDt, lastTsdt, lastTedt, nowTsdt, output }];
  }, []);

  const availableChargerCount = chargers.filter((charger) => charger.stat === '2').length;

  return res.status(200).json({
    statId,
    statNm,
    addr,
    location,
    useTime,
    bnm,
    busiCall,
    kindDetail,
    parkingFree,
    note,
    limitYn,
    limitDetail,
    delYn,
    delDetail,
    chargers,
    chargerCount: chargers.length,
    availableChargerCount,
  });
}
