import type { NextApiRequest, NextApiResponse } from 'next';

import { ChargerInfoRes, Error, StationDTO } from '@/types/charger';
import { getChargersAPI } from '@/services/charger';
import {
  convertToBooleanOrNull,
  convertToCoord,
  convertUseTime,
  getMarkerType,
  haversineDistance,
  isAvailable,
  isFastCharge,
  removeNullString,
} from '@/utils/charger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChargerInfoRes | Error>
) {
  const { districtCode, lat: currentLat, lng: currentLng } = req.query;

  const isInvalidQuery =
    typeof districtCode !== 'string' ||
    typeof currentLat !== 'string' ||
    typeof currentLng !== 'string';

  if (isInvalidQuery) {
    res.status(400).json({ message: 'Bad Request' });
    return;
  }

  try {
    const chargerData = await getChargersAPI(districtCode);

    const {
      totalCount,
      items: { item: data },
    } = chargerData;

    const stations = data
      .reduce<StationDTO[]>((acc, cur) => {
        const existingStation = acc.find((station) => station.statId === cur.statId);

        if (!existingStation) {
          acc.push({
            statId: cur.statId,
            statNm: cur.statNm,
            addr: cur.addr,
            lat: cur.lat,
            lng: cur.lng,
            distance: haversineDistance(
              convertToCoord(currentLat, currentLng),
              convertToCoord(cur.lat, cur.lng)
            ),
            location: removeNullString(cur.location),
            useTime: convertUseTime(cur.useTime),
            bnm: removeNullString(cur.bnm),
            busiCall: removeNullString(cur.busiCall),
            kindDetail: removeNullString(cur.kindDetail),
            parkingFree: convertToBooleanOrNull(cur.parkingFree),
            note: removeNullString(cur.note),
            limitDetail: removeNullString(cur.limitDetail),
            delDetail: removeNullString(cur.delDetail),
            availableCount: isAvailable(cur.stat) ? 1 : 0,
            hasFastCharger: isFastCharge(cur.chgerType),
            markerType: 0,
            chargers: [
              {
                chgerType: cur.chgerType,
                chgerId: cur.chgerId,
                stat: cur.stat,
                statUpdDt: cur.statUpdDt,
                lastTedt: cur.lastTedt,
                nowTsdt: cur.nowTsdt,
                output: cur.output,
              },
            ],
          });
        } else {
          existingStation.availableCount += isAvailable(cur.stat) ? 1 : 0;
          existingStation.hasFastCharger =
            existingStation.hasFastCharger || isFastCharge(cur.chgerType);
          existingStation.chargers.push({
            chgerId: cur.chgerId,
            chgerType: cur.chgerType,
            stat: cur.stat,
            statUpdDt: cur.statUpdDt,
            lastTedt: cur.lastTedt,
            nowTsdt: cur.nowTsdt,
            output: cur.output,
          });
        }

        return acc;
      }, [])
      .map((station) => {
        const { availableCount, hasFastCharger } = station;
        return {
          ...station,
          markerType: getMarkerType(availableCount, hasFastCharger),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      chargerCount: totalCount,
      stationCount: stations.length,
      stations,
    });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
