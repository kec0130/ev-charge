import Link from 'next/link';
import Logo from '../Logo';
export default function Footer() {
  return (
    <footer className='site-footer'>
      <div>
        <Link href='/' aria-label='전기차G 홈'>
          <Logo />
        </Link>
        <p>충전부터 구매까지, 전기차 생활을 더 편하게.</p>
        <small>© {new Date().getFullYear()} EV Charge.</small>
      </div>
      <div className='footer-links'>
        <Link href='/'>충전 지도</Link>
        <Link href='/blog'>전기차 블로그</Link>
        <a href='https://chaechae.life' target='_blank' rel='noreferrer noopener'>
          개발자 소개
        </a>
      </div>
    </footer>
  );
}
