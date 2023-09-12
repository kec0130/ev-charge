import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    primary: '#55CC88',
    secondary: '#66B2FF',
    accent: '#F7CE00',
    warning: '#FF6666',
  },
  sizes: {
    navHeight: '50px',
    mapHeight: '45dvh',
  },
  zIndex: {
    nav: 300,
    select: 200,
    bottomSheet: 101,
  },
  shadows: {
    onMap: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0px',
    bottomSheet: '0 -2px 4px 0px rgba(60,64,67,0.15)',
  },
});

export default customTheme;
