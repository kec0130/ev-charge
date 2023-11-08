import { extendTheme } from '@chakra-ui/react';

const variables = {
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
};

const styles = {
  global: {
    '.mdx-prose': {
      '#목차': {
        pt: 5,
        '& + ul a': {
          color: 'green.400',
          fontWeight: 'semibold',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
      p: {
        my: 5,
      },
      mark: {
        bg: 'orange.100',
        fontWeight: 'bold',
      },
      table: {
        width: '100%',
        'th, td': {
          py: [2, 4],
          px: [4, 6],
          fontSize: ['sm', 'md'],
          whiteSpace: 'normal',
          borderBottomWidth: 1,
          borderColor: 'gray.100',
          textAlign: 'center',
        },
        th: {
          py: 2,
          fontWeight: 'bold',
        },
      },
    },
  },
};

const theme = extendTheme({
  ...variables,
  styles,
});

export default theme;
