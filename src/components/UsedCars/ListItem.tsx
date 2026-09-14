import Image from 'next/image';
import type { UsedCar } from '@/types/supabase';
export default function UsedCarListItem({ usedCar }: { usedCar: UsedCar }) {
  return (
    <li className='car-card'>
      <div className='car-image'>
        <Image src={usedCar.image || '/og.png'} alt={usedCar.name} width={340} height={224} />
      </div>
      <div className='car-copy'>
        <h3>{usedCar.name}</h3>
        <p>조사 당시 매물 가격</p>
        <strong className='car-price'>
          {usedCar.min_price.toLocaleString('ko-KR')} ~ {usedCar.max_price.toLocaleString('ko-KR')}
          만 원
        </strong>
      </div>
    </li>
  );
}
