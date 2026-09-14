import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { currentDistrictAtom } from '@/states/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import useGeocode from '@/hooks/useGeocode';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import Icon from '@/components/Common/Icon';

export default function AddressSelector({ compact = false }: { compact?: boolean }) {
  const district = useAtomValue(currentDistrictAtom);
  const [city, setCity] = useState(district.slice(0, 2));
  const picker = useRef<HTMLDetailsElement>(null);
  const { geocode } = useGeocode();
  const { getCurrentLocation } = useCurrentLocation();
  useEffect(() => {
    if (district) setCity(district.slice(0, 2));
    if (picker.current) picker.current.open = false;
  }, [district]);
  useEffect(() => {
    if (!compact) return;
    const closeOutside = (event: PointerEvent) => {
      if (picker.current && !picker.current.contains(event.target as Node))
        picker.current.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && picker.current?.open) {
        picker.current.open = false;
        picker.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [compact]);
  const controls = (
    <div className='region-controls'>
      <select aria-label='시·도 선택' value={city} onChange={(e) => setCity(e.target.value)}>
        <option value=''>시·도 선택</option>
        {Object.entries(CITY_CODE).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <select
        aria-label='시·군·구 선택'
        value={district.startsWith(city) ? district : ''}
        disabled={!city}
        onChange={(e) => {
          if (!e.target.value) return;
          geocode(city, e.target.value);
          if (picker.current) picker.current.open = false;
        }}
      >
        <option value=''>시·군·구 선택</option>
        {Object.entries(DISTRICT_CODE)
          .filter(([code]) => city && code.startsWith(city))
          .map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
      </select>
      <button
        className='map-icon-button'
        style={{ width: 32, height: 32, boxShadow: 'none' }}
        aria-label='현재 위치로 이동'
        onClick={() => {
          getCurrentLocation();
          if (picker.current) picker.current.open = false;
        }}
      >
        <Icon name='locate' size={17} />
      </button>
    </div>
  );
  if (!compact) return controls;
  const cityName = CITY_CODE[district.slice(0, 2)]?.replace(
    /통합특별시|특별자치도|특별자치시|특별시|광역시/,
    '',
  );
  return (
    <details className='mobile-region-picker' ref={picker}>
      <summary aria-label='충전소 검색 지역 변경'>
        <Icon name='pin' size={16} />
        <span>{cityName ? `${cityName} ${DISTRICT_CODE[district] || ''}` : '지역 선택'}</span>
        <Icon name='chevron' size={14} className='region-chevron' />
      </summary>
      <div className='region-picker-popover'>
        <p>충전할 지역을 선택하세요</p>
        {controls}
      </div>
    </details>
  );
}
