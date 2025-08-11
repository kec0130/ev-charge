import { useRouter } from 'next/router';
import { Container, useTheme } from '@chakra-ui/react';
import Navigation from './Navigation';
import Footer from './Footer';
import NoticeModal from './NoticeModal';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const router = useRouter();
  const mapPage = router.asPath === '/';

  return (
    <>
      <NoticeModal />
      <Navigation />
      <Container as='main' maxW='container.lg' p={mapPage ? 0 : [4, 6]} mt={theme.sizes.navHeight}>
        {children}
      </Container>
      {!mapPage && <Footer />}
    </>
  );
};

export default Layout;
