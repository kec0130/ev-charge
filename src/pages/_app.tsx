import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '@/styles/customTheme';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
