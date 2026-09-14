import { useAtom } from 'jotai';
import { filterOptionAtom } from '@/states/map';
import type { FilterType } from '@/types/map';
const filters: { key: FilterType; label: string }[] = [
  { key: 'onlyPublic', label: '제한 없는 곳' },
  { key: 'onlyAvailable', label: '충전 가능' },
  { key: 'onlyFastCharger', label: '급속' },
];
export default function Filter() {
  const [options, setOptions] = useAtom(filterOptionAtom);
  return (
    <div className='filter-chips' aria-label='충전소 필터'>
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className='filter-chip'
          aria-pressed={options[key]}
          onClick={() => setOptions((previous) => ({ ...previous, [key]: !previous[key] }))}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
