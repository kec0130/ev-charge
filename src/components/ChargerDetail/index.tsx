import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { currentDistrictAtom, currentStationAtom, isLocationOffAtom } from '@/states/map';
import useChargers from '@/hooks/useChargers';
import StationInfo from './StationInfo';
import NearbyStations from './NearbyStations';
import Icon from '../Common/Icon';

export default function ChargerDetail() {
  const [current, setCurrent] = useAtom(currentStationAtom);
  const district = useAtomValue(currentDistrictAtom);
  const locationOff = useAtomValue(isLocationOffAtom);
  const { data, isLoading, error, retry } = useChargers();
  const [expanded, setExpanded] = useState(false);
  const [detailId, setDetailId] = useState('');
  useEffect(() => {
    setDetailId('');
  }, [district]);
  useEffect(() => {
    if (detailId && current !== detailId) setDetailId('');
    if (!detailId) setExpanded(false);
  }, [current, detailId]);
  const detail = data?.stations.find((station) => station.statId === detailId);
  return (
    <section
      className={`station-panel${expanded ? ' expanded' : ''}`}
      aria-label='충전소 목록과 상세 정보'
    >
      <button
        className='sheet-toggle'
        aria-label={expanded ? '충전소 목록 접기' : '충전소 목록 펼치기'}
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        <span />
      </button>
      {locationOff && (
        <p className='location-notice'>
          현재 위치를 확인할 수 없어요. 지역 검색을 이용하고, 거리 정보는 참고해주세요.
        </p>
      )}
      {isLoading && !data ? (
        <div className='empty-state' role='status'>
          <Icon name='bolt' size={30} />
          <h2>충전소를 찾고 있어요</h2>
          <p>충전 가능 여부를 확인하고 있습니다.</p>
        </div>
      ) : error ? (
        <div className='empty-state' role='alert'>
          <Icon name='info' size={30} />
          <h2>충전소 정보를 불러오지 못했어요</h2>
          <p>잠시 후 다시 시도해주세요.</p>
          <button className='outline-button' onClick={() => retry()}>
            다시 시도
          </button>
        </div>
      ) : detail ? (
        <div className='station-detail'>
          <button className='detail-back' onClick={() => setDetailId('')}>
            <Icon name='back' size={16} />
            충전소 목록으로
          </button>
          <StationInfo station={detail} />
        </div>
      ) : data ? (
        <NearbyStations
          stations={data.stations}
          onDetails={(id) => {
            setCurrent(id);
            setDetailId(id);
            if (window.matchMedia('(max-width: 767px)').matches) setExpanded(true);
          }}
        />
      ) : (
        <div className='empty-state'>
          <h2>충전할 지역을 선택해주세요</h2>
          <p>주소 검색이나 지역 선택으로 찾아보세요.</p>
        </div>
      )}
    </section>
  );
}
