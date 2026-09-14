import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { currentDistrictAtom } from '@/states/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import useGeocode from '@/hooks/useGeocode';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import Icon from '@/components/Common/Icon';

export default function AddressSelector() {
  const district = useAtomValue(currentDistrictAtom);
  const [city, setCity] = useState(district.slice(0, 2));
  const { geocode } = useGeocode();
  const { getCurrentLocation } = useCurrentLocation();
  useEffect(() => {
    if (district) setCity(district.slice(0, 2));
  }, [district]);
  return (
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
        onChange={(e) => geocode(city, e.target.value)}
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
        onClick={getCurrentLocation}
      >
        <Icon name='locate' size={17} />
      </button>
    </div>
  );
}
