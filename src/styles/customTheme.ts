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
    mapHeight: '40vh',
  },
  zIndex: {
    nav: 300,
    select: 200,
  },
  shadows: {
    onMap: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0px',
  },
});

export default customTheme;
