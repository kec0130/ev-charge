import Link from 'next/link';
import Icon from './Icon';
import ResponsiveAds from './AdSense/ResponsiveAds';

export function MapGuideCard() {
  return (
    <section className='map-guide-card'>
      <Icon name='map' size={42} />
      <h2>내 주변 충전소 찾기</h2>
      <p>출입 조건과 충전 가능 여부를 함께 확인하세요.</p>
      <Link className='primary-button' href='/'>
        충전 지도 열기 <Icon name='arrow' size={18} />
      </Link>
    </section>
  );
}
export function AdPanel() {
  return (
    <div className='ad-panel' aria-label='광고'>
      <span>광고</span>
      <ResponsiveAds />
    </div>
  );
}
export default function GuideSidebar() {
  return (
    <aside className='guide-sidebar'>
      <section className='aside-card'>
        <h2>처음 전기차를 탄다면</h2>
        <Link href='/blog/ev-charge-introduction'>
          <Icon name='document' />
          충전소 이용 방법 알아보기
          <Icon name='chevron' size={16} />
        </Link>
        <Link href='/blog/home-ev-charger'>
          <Icon name='document' />
          집밥 설치와 충전 생활
          <Icon name='chevron' size={16} />
        </Link>
        <Link href='/used-cars'>
          <Icon name='document' />
          중고 전기차 가격 살펴보기
          <Icon name='chevron' size={16} />
        </Link>
      </section>
      <MapGuideCard />
      <AdPanel />
    </aside>
  );
}
