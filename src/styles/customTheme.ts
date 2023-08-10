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
    mapHeight: '50vh',
  },
});

export default customTheme;
