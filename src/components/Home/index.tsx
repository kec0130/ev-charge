import { Box, Divider } from '@chakra-ui/react';
import Map from '../Map';
import StationHeader from './StationHeader';
import ChargerTable from './ChargerTable';
import StationTable from './StationTable';

const Homepage = () => {
  return (
    <>
      <Map />
      <Box
        position='fixed'
        overflowY='auto'
        h='calc(50vh - 24px - 16px)'
        w='100%'
        maxW='8xl'
        m='8px auto'
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <StationHeader />
        <Divider h={2} mt={2} mb={2} bg='gray.200' />
        <ChargerTable />
        <Divider h={2} mt={2} mb={2} bg='gray.200' />
        <StationTable />
      </Box>
    </>
  );
};

export default Homepage;
