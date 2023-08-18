import { useRouter } from 'next/router';
import { Container, useTheme } from '@chakra-ui/react';
import Navigation from './Navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const router = useRouter();
  const mapPage = router.asPath === '/';

  return (
    <>
      <Navigation />
      <Container as='main' maxW='container.lg' mt={theme.sizes.navHeight} p={mapPage ? 0 : 6}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
