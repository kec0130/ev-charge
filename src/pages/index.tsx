import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Container } from '@chakra-ui/react';

import useCurrentLocation from '@/hooks/useCurrentLocation';
import Map from '@/components/Map';
import ChargerDetail from '@/components/ChargerDetail';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { currentLocation, isLocationFound } = useCurrentLocation();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container className={inter.className} maxW='8xl' p={0}>
        <Map isLocationFound={isLocationFound} currentLocation={currentLocation} />
        <ChargerDetail isLocationFound={isLocationFound} />
      </Container>
    </>
  );
}
