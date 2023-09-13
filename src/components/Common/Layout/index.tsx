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
      <Container
        as='main'
        maxW='container.lg'
        p={mapPage ? 0 : [4, 6]}
        mt={theme.sizes.navHeight}
        mb='env(safe-area-inset-bottom)'
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
