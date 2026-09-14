import Link from 'next/link';
import { useRouter } from 'next/router';
import { MENU_LIST } from '@/constants/navigation';
import Logo from '../Logo';
import Icon, { IconName } from '../Icon';

const icons: IconName[] = ['pin', 'book', 'chart'];
export default function Navigation() {
  const { pathname } = useRouter();
  const active = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const links = (mobile: boolean) =>
    MENU_LIST.map((menu, index) => (
      <Link
        key={menu.href}
        href={menu.href}
        className={active(menu.href) ? 'active' : ''}
        aria-current={active(menu.href) ? 'page' : undefined}
      >
        {mobile && <Icon name={icons[index]} size={23} />}
        <span>{menu.name}</span>
      </Link>
    ));
  return (
    <>
      <a className='skip-link' href='#main-content'>
        본문으로 건너뛰기
      </a>
      <header className='site-header'>
        <div className='header-inner'>
          <Link href='/' className='brand-link' aria-label='전기차G 홈'>
            <Logo />
          </Link>
          <nav className='desktop-navigation' aria-label='주 메뉴'>
            {links(false)}
          </nav>
          <span className='mobile-brand-note'>전기차와 함께하는 일상</span>
        </div>
      </header>
      <nav className='mobile-navigation' aria-label='모바일 주 메뉴'>
        {links(true)}
      </nav>
    </>
  );
}
