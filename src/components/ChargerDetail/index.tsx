import useSWR from 'swr';
import { useEffect, useRef } from 'react';
import { Box, Divider, Spinner, Text } from '@chakra-ui/react';

import { CURRENT_DISTRICT_KEY, CURRENT_STATION_KEY } from '@/constants/map';
import useChargers from '@/hooks/useChargers';
import StationHeader from './StationHeader';
import ChargerTable from './ChargerTable';
import StationTable from './StationTable';

const ChargerDetail = ({ isLocationFound }: { isLocationFound: boolean }) => {
  const { data: stationId } = useSWR<string>(CURRENT_STATION_KEY);
  const { data: districtCode } = useSWR<string>(CURRENT_DISTRICT_KEY);
  const { chargers, isLoading } = useChargers(districtCode || '');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [stationId]);

  return (
    <Box
      position='fixed'
      overflowY='auto'
      h='calc(50vh - 24px - 16px)'
      w='full'
      maxW='8xl'
      m='8px auto'
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {!isLocationFound || isLoading ? (
        <Box p={4} textAlign='center'>
          <Spinner />
          <Text mt={2}>
            {!isLocationFound
              ? '현재 위치를 찾는 중입니다...'
              : '충전소 정보를 불러오는 중입니다...'}
          </Text>
        </Box>
      ) : null}

      {chargers && !stationId && (
        <Box p={4} textAlign='center'>
          충전소를 선택해주세요.
        </Box>
      )}

      {chargers && stationId && (
        <div ref={scrollRef}>
          <StationHeader station={chargers.data[stationId][0]} />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <ChargerTable />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <StationTable station={chargers.data[stationId][0]} />
        </div>
      )}
    </Box>
  );
};

export default ChargerDetail;
