import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { UsedCar } from '@/types/supabase';
import type { SortOption } from '@/types/usedCars';
import UsedCarListItem from './ListItem';
import SearchBar from './SearchBar';
import Options from './Options';
import Icon from '../Common/Icon';
import { AdPanel } from '../Common/GuideSidebar';

export default function UsedCars({ usedCars, month }: { usedCars: UsedCar[]; month: string }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('name');
  const results = useMemo(() => {
    const clean = (text: string) => text.toLowerCase().replace(/\s/g, '');
    return usedCars
      .filter((car) => clean(car.name).includes(clean(query)))
      .sort((a, b) =>
        sort === 'minPrice'
          ? a.min_price - b.min_price
          : sort === 'maxPrice'
            ? b.max_price - a.max_price
            : a.name.localeCompare(b.name, 'ko'),
      );
  }, [usedCars, query, sort]);
  return (
    <>
      <h1 className='page-title'>중고 전기차 시세</h1>
      <p className='page-description'>차종별 가격 범위를 한눈에 비교해보세요.</p>
      <div className='price-notice'>
        <Icon name='info' size={19} />
        <p>{month.replace('-', '년 ')}월 조사 자료 · 현재 시세와 다를 수 있습니다</p>
      </div>
      <div className='car-controls'>
        <SearchBar
          inputValue={query}
          handleInputChange={(e) => setQuery(e.target.value)}
          handleClearButtonClick={() => setQuery('')}
        />
        <Options
          sortOption={sort}
          handleSortOptionChange={(e) => setSort(e.target.value as SortOption)}
        />
      </div>
      <h2 className='section-heading'>
        차종별 가격 범위 <span className='result-count'>· {results.length}개 차종</span>
      </h2>
      {results.length ? (
        <ul className='car-list'>
          {results.map((car) => (
            <UsedCarListItem key={car.id} usedCar={car} />
          ))}
        </ul>
      ) : (
        <div className='empty-state' role='status'>
          <Icon name='search' size={30} />
          <h2>검색 결과가 없습니다</h2>
          <p>다른 차종명을 입력해보세요.</p>
          <button className='outline-button' onClick={() => setQuery('')}>
            전체 차종 보기
          </button>
        </div>
      )}
      <p className='car-footnote'>
        조사 당시 온라인 매물의 최저·최고 가격입니다. 연식·주행거리·트림·사고 이력을 통제한 통계나
        실거래가가 아닙니다. 가격 자료는 2024년 5월까지 제공하며, 최신 매물은 중고차 전문 사이트에서
        확인해주세요.
      </p>
      <section className='purchase-guide'>
        <div className='guide-icon'>
          <Icon name='document' size={25} />
        </div>
        <div>
          <h2>가격 비교 전에 확인하세요</h2>
          <p>연식 · 주행거리 · 트림 · 사고 이력</p>
        </div>
        <Link href='/blog/genesis-gv70'>
          전기차 구매 정보 읽기 <Icon name='arrow' size={18} />
        </Link>
      </section>
      <AdPanel />
    </>
  );
}
