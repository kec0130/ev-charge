import { useRouter } from 'next/router';
import type { ChangeEventHandler } from 'react';
import { generateDateStrings } from '@/utils/usedCars';
export default function Options({
  sortOption,
  handleSortOptionChange,
}: {
  sortOption: string;
  handleSortOptionChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  const router = useRouter();
  return (
    <div className='car-options'>
      <select
        aria-label='조사 연월'
        value={router.query.month as string}
        onChange={(e) => router.push(`/used-cars/${e.target.value}`, undefined, { scroll: false })}
      >
        {generateDateStrings()
          .reverse()
          .map((month) => (
            <option key={month} value={month}>
              {month.replace('-', '년 ')}월
            </option>
          ))}
      </select>
      <select aria-label='가격 정렬' value={sortOption} onChange={handleSortOptionChange}>
        <option value='name'>가나다순</option>
        <option value='minPrice'>최저가 낮은 순</option>
        <option value='maxPrice'>최고가 높은 순</option>
      </select>
    </div>
  );
}
