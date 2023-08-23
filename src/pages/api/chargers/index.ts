import type { NextApiRequest, NextApiResponse } from 'next';

import { ChargerInfoRes, Error, StationDTO } from '@/types/charger';
import { getChargersAPI } from '@/services/charger';
import {
  convertToBooleanOrNull,
  convertUseTime,
  isAvailable,
  isFastCharge,
  removeNullString,
} from '@/utils/charger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChargerInfoRes | Error>
) {
  const { districtCode } = req.query;

  if (typeof districtCode !== 'string') {
    res.status(400).json({ message: 'Bad Request' });
    return;
  }

  const chargerData = await getChargersAPI(districtCode);

  const {
    totalCount,
    items: { item: data },
  } = chargerData;

  const stations = data.reduce<StationDTO[]>((acc, cur) => {
    const {
      statId,
      lat,
      lng,
      statNm,
      addr,
      location,
      useTime,
      bnm,
      busiCall,
      kindDetail,
      parkingFree,
      note,
      limitDetail,
      delDetail,
      chgerId,
      chgerType,
      stat,
      statUpdDt,
      lastTedt,
      nowTsdt,
      output,
    } = cur;

    const existingStation = acc.find((station) => station.statId === statId);

    if (!existingStation) {
      acc.push({
        statId,
        lat,
        lng,
        statNm,
        addr,
        location: removeNullString(location),
        useTime: convertUseTime(useTime),
        bnm: removeNullString(bnm),
        busiCall: removeNullString(busiCall),
        kindDetail: removeNullString(kindDetail),
        parkingFree: convertToBooleanOrNull(parkingFree),
        note: removeNullString(note),
        limitDetail: removeNullString(limitDetail),
        delDetail: removeNullString(delDetail),
        availableCount: isAvailable(stat) ? 1 : 0,
        hasFastCharger: isFastCharge(output),
        chargers: [
          {
            chgerId,
            chgerType,
            stat,
            statUpdDt,
            lastTedt,
            nowTsdt,
            output,
          },
        ],
      });
    } else {
      existingStation.availableCount += isAvailable(stat) ? 1 : 0;
      existingStation.hasFastCharger = existingStation.hasFastCharger || isFastCharge(output);
      existingStation.chargers.push({
        chgerId,
        chgerType,
        stat,
        statUpdDt,
        lastTedt,
        nowTsdt,
        output,
      });
    }

    return acc;
  }, []);

  res.status(200).json({
    chargerCount: totalCount,
    stationCount: stations.length,
    stations,
  });
}
