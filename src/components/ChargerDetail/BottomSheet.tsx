import { useEffect, useRef } from 'react';
import { Box, Container, useTheme } from '@chakra-ui/react';

const BottomSheet = ({ children }: { children: React.ReactNode }) => {
  const topRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    topRef.current?.scrollIntoView();
  }, [children]);

  return (
    <Container
      pos='fixed'
      bottom='env(safe-area-inset-bottom)'
      zIndex={theme.zIndex.bottomSheet}
      maxW='container.lg'
      h={`calc(100dvh - ${theme.sizes.mapHeight} - ${theme.sizes.navHeight} + 8px)`}
      overflowY='auto'
      p={0}
      bg='white'
      shadow={theme.shadows.bottomSheet}
      borderRadius='16px 16px 0 0'
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box pos='sticky' top={0} zIndex={10} w='full' h={6} bg='white'></Box>
      <Box ref={topRef} scrollMarginTop={6} />
      {children}
    </Container>
  );
};

export default BottomSheet;
