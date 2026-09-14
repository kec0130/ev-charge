import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#147A4B',
    secondary: '#3387ED',
    accent: '#F4B400',
    warning: '#C54C40',
    green: {
      50: '#EDF8F2',
      100: '#D8EFE2',
      200: '#A5DBB8',
      300: '#76BF94',
      400: '#389A65',
      500: '#147A4B',
      600: '#086B40',
      700: '#125437',
      800: '#173D2A',
      900: '#102B20',
    },
  },
  fonts: { heading: 'inherit', body: 'inherit' },
  sizes: { navHeight: '72px', mapHeight: '100%' },
  zIndex: { nav: 300, select: 200, bottomSheet: 101 },
  shadows: { onMap: '0 2px 12px #153d291a', bottomSheet: '0 -4px 20px #153d2914' },
  components: {
    Button: { defaultProps: { colorScheme: 'green' }, baseStyle: { borderRadius: '10px' } },
    Input: { defaultProps: { focusBorderColor: 'green.500' } },
    Select: { defaultProps: { focusBorderColor: 'green.500' } },
    Badge: { baseStyle: { borderRadius: 'full', px: 2, fontWeight: 500, textTransform: 'none' } },
  },
  styles: {
    global: {
      body: { color: '#17251F', bg: '#FFFFFF' },
      '*:focus-visible': { outline: '3px solid #67AD88', outlineOffset: '3px' },
    },
  },
});
export default theme;
