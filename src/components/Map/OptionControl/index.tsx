import { FormEvent, useState } from 'react';
import Icon from '@/components/Common/Icon';
import useMap from '@/hooks/useMap';
import useGeocode from '@/hooks/useGeocode';
import AddressSelector from './AddressSelector';
import Filter from './Filter';
export default function OptionControl() {
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState('');
  const [searching, setSearching] = useState(false);
  const { map, moveMap } = useMap();
  const { reverseGeocode } = useGeocode();
  const search = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    if (typeof naver === 'undefined' || !naver.maps.Service || !map) {
      setFeedback('지도를 불러온 뒤 다시 검색해주세요.');
      return;
    }
    setSearching(true);
    setFeedback('');
    naver.maps.Service.geocode({ query: query.trim() }, (status, response) => {
      setSearching(false);
      const address = response?.v2?.addresses?.[0];
      if (status !== naver.maps.Service.Status.OK || !address) {
        setFeedback('주소를 찾지 못했습니다. 도로명 또는 지번 주소로 검색해주세요.');
        return;
      }
      const coord: [number, number] = [Number(address.y), Number(address.x)];
      moveMap(coord);
      reverseGeocode(coord);
    });
  };
  return (
    <section className='map-options' aria-label='충전소 검색'>
      <h1>어디에서 충전할까요?</h1>
      <form className='search-field map-search' onSubmit={search}>
        <Icon name='search' size={19} />
        <input
          aria-label='지역 또는 주소 검색'
          placeholder='지역이나 주소를 검색하세요'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setFeedback('');
          }}
        />
        <button type='submit' aria-label='주소 검색' disabled={searching}>
          <Icon name='arrow' size={17} />
        </button>
      </form>
      <Filter />
      <AddressSelector />
      {feedback && (
        <p className='map-search-feedback' role='status'>
          {feedback}
        </p>
      )}
    </section>
  );
}
