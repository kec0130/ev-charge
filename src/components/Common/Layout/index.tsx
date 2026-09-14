import { useRouter } from 'next/router';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const mapPage = useRouter().pathname === '/';
  return (
    <>
      <Navigation />
      <main id='main-content' className={mapPage ? 'main-map' : 'main-content'}>
        {children}
      </main>
      {!mapPage && <Footer />}
    </>
  );
}
