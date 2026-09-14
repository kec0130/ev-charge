import { useEffect, useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import type { StationDTO } from '@/types/charger';
import { currentStationAtom, filterOptionAtom } from '@/states/map';
import { convertDistance, convertToCoord } from '@/utils/charger';
import { getDirectionsUrl, getStationAvailability } from '@/utils/stationPresentation';
import useMap from '@/hooks/useMap';
import Icon from '../Common/Icon';

export default function NearbyStations({
  stations,
  onDetails,
}: {
  stations: StationDTO[];
  onDetails: (id: string) => void;
}) {
  const [current, setCurrent] = useAtom(currentStationAtom);
  const { onlyFastCharger } = useAtomValue(filterOptionAtom);
  const [sort, setSort] = useState('distance');
  const [limit, setLimit] = useState(20);
  const { moveMap } = useMap();
  const sorted = useMemo(
    () =>
      [...stations].sort((a, b) =>
        sort === 'available'
          ? getStationAvailability(b, onlyFastCharger).available -
              getStationAvailability(a, onlyFastCharger).available || a.distance - b.distance
          : a.distance - b.distance,
      ),
    [stations, sort, onlyFastCharger],
  );
  const selected = stations.find((station) => station.statId === current);
  const visible = sorted.slice(0, limit);
  if (selected && !visible.some((station) => station.statId === current)) visible.unshift(selected);
  useEffect(() => {
    setLimit(20);
  }, [stations, sort]);
  useEffect(() => {
    if (current)
      document.getElementById(`station-${current}`)?.scrollIntoView({ block: 'nearest' });
  }, [current]);
  const choose = (station: StationDTO) => {
    setCurrent(station.statId);
    moveMap(convertToCoord(station.lat, station.lng));
  };
  return (
    <>
      <div className='station-list-heading'>
        <h2>주변 충전소 {stations.length}곳</h2>
        <select aria-label='충전소 정렬' value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value='distance'>가까운 순</option>
          <option value='available'>충전 가능 대수순</option>
        </select>
      </div>
      {!stations.length && (
        <div className='empty-state' role='status'>
          <Icon name='search' size={28} />
          <h2>조건에 맞는 충전소가 없어요</h2>
          <p>필터를 바꾸거나 다른 지역을 찾아보세요.</p>
        </div>
      )}
      <ul className='station-list'>
        {visible.map((station) => {
          const state = getStationAvailability(station, onlyFastCharger);
          const active = station.statId === current;
          return (
            <li
              id={`station-${station.statId}`}
              key={station.statId}
              className={`station-card${active ? ' selected' : ''}`}
            >
              <button
                className='station-select'
                aria-label={`${station.statNm} 지도에서 보기`}
                aria-pressed={active}
                onClick={() => choose(station)}
              >
                <h3>{station.statNm}</h3>
                <Icon name='chevron' size={17} />
              </button>
              <span className={`access-badge${station.access === 'public' ? '' : ' caution'}`}>
                {station.access === 'public'
                  ? '공공데이터상 제한 없음'
                  : station.access === 'restricted'
                    ? '이용자 제한 있음'
                    : '이용 대상 확인 필요'}
              </span>
              <strong className={`station-availability ${state.state}`}>
                {state.available
                  ? `${state.type} ${state.available}대 충전 가능`
                  : '사용 중 또는 상태 미확인'}
              </strong>
              <p className='station-counts'>
                {state.fastTotal > 0 && `급속 ${state.fastAvailable}/${state.fastTotal}`}
                {state.fastTotal > 0 && state.slowTotal > 0 && ' · '}
                {state.slowTotal > 0 && `완속 ${state.slowAvailable}/${state.slowTotal}`}
                {state.fastTotal === 0 && state.slowTotal === 0 && '충전기 유형 확인 필요'}
              </p>
              <p className='station-meta'>
                <Icon name='pin' size={14} />
                <span>
                  {convertDistance(station.distance)} · {station.addr}
                </span>
              </p>
              <p className='station-meta'>
                <Icon name='clock' size={14} />
                <span>
                  {station.useTime || '운영시간 확인 필요'} ·{' '}
                  {station.parkingFree === true
                    ? '주차 무료'
                    : station.parkingFree === false
                      ? '주차 유료'
                      : '주차요금 확인 필요'}
                </span>
              </p>
              <div className='station-actions'>
                <a
                  className={active ? 'primary-button' : 'outline-button'}
                  href={getDirectionsUrl(station)}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Icon name='navigate' size={15} />
                  길찾기
                </a>
                <button className='outline-button' onClick={() => onDetails(station.statId)}>
                  상세보기
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {sorted.length > limit && (
        <button
          className='outline-button station-load-more'
          onClick={() => setLimit((value) => value + 20)}
        >
          충전소 더 보기 ({Math.min(limit, sorted.length)}/{sorted.length})
        </button>
      )}
      <p className='station-source'>
        <Icon name='info' size={15} />
        <span>
          출처: 한국환경공단. 방문 전 출입 조건과 운영시간을 확인해주세요. 혼합 충전소는 남은 급속
          충전기를 우선 표시합니다.
        </span>
      </p>
    </>
  );
}
