import { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  currentDistrictAtom,
  currentStationAtom,
  isLocationOffAtom,
  stationSheetAtom,
  StationSheetState,
} from '@/states/map';
import useChargers from '@/hooks/useChargers';
import StationInfo from './StationInfo';
import NearbyStations from './NearbyStations';
import Icon from '../Common/Icon';

export default function ChargerDetail() {
  const [current, setCurrent] = useAtom(currentStationAtom);
  const district = useAtomValue(currentDistrictAtom);
  const locationOff = useAtomValue(isLocationOffAtom);
  const { data, isLoading, error, retry } = useChargers();
  const [sheet, setSheet] = useAtom(stationSheetAtom);
  const swipeStart = useRef<number | null>(null);
  const swiped = useRef(false);
  const content = useRef<HTMLDivElement>(null);
  const [detailId, setDetailId] = useState('');
  useEffect(() => {
    setDetailId('');
    setSheet('collapsed');
  }, [district, setSheet]);
  useEffect(() => {
    setDetailId((previous) => (previous === current ? previous : ''));
    if (current && window.matchMedia('(max-width: 767px)').matches)
      setSheet((previous) => (previous === 'expanded' ? previous : 'preview'));
  }, [current, setSheet]);
  useEffect(() => {
    if (sheet === 'collapsed') return;
    if (detailId) {
      content.current?.scrollTo({ top: 0 });
    } else if (current) {
      document.getElementById(`station-${current}`)?.scrollIntoView({ block: 'nearest' });
    }
  }, [sheet, current, detailId]);
  const detail = data?.stations.find((station) => station.statId === detailId);
  const summary =
    isLoading && !data
      ? '충전소를 찾고 있어요'
      : error
        ? '충전소 정보 확인 필요'
        : `주변 충전소 ${data?.stations.length ?? 0}곳`;
  return (
    <section className='station-panel' aria-label='충전소 목록과 상세 정보'>
      <div
        className='sheet-header'
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          swipeStart.current = event.clientY;
          swiped.current = false;
          const target = event.target as Element;
          (target.closest('button') ?? event.currentTarget).setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (swipeStart.current === null) return;
          const distance = swipeStart.current - event.clientY;
          swipeStart.current = null;
          if (Math.abs(distance) < 35) return;
          swiped.current = true;
          const steps: StationSheetState[] = ['collapsed', 'preview', 'expanded'];
          setSheet(steps[Math.max(0, Math.min(2, steps.indexOf(sheet) + (distance > 0 ? 1 : -1)))]);
        }}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
        onClickCapture={(event) => {
          if (swiped.current) {
            event.preventDefault();
            event.stopPropagation();
            swiped.current = false;
          }
        }}
      >
        <button
          className='sheet-toggle'
          aria-label={sheet === 'expanded' ? '충전소 목록 접기' : '충전소 목록 펼치기'}
          aria-expanded={sheet !== 'collapsed'}
          aria-controls='station-panel-content'
          onClick={() => setSheet(sheet === 'expanded' ? 'collapsed' : 'expanded')}
        >
          <span className='sheet-grip' />
          <span className='sheet-heading'>
            <strong>{summary}</strong>
            <span>{sheet === 'expanded' ? '목록 접기' : '목록 보기'}</span>
            <Icon name='chevron' size={16} />
          </span>
        </button>
        {sheet !== 'collapsed' && (
          <button
            className='sheet-map-button'
            aria-label='목록을 접고 지도 크게 보기'
            onClick={() => setSheet('collapsed')}
          >
            <Icon name='map' size={18} />
          </button>
        )}
      </div>
      <div className='station-panel-content' id='station-panel-content' ref={content}>
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
              if (window.matchMedia('(max-width: 767px)').matches) setSheet('expanded');
            }}
          />
        ) : (
          <div className='empty-state'>
            <h2>충전할 지역을 선택해주세요</h2>
            <p>주소 검색이나 지역 선택으로 찾아보세요.</p>
          </div>
        )}
      </div>
    </section>
  );
}
