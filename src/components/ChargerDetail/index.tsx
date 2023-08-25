import { Box, Divider, Spinner, Text, useTheme } from '@chakra-ui/react';

import useCurrentStation from '@/hooks/useCurrentStation';
import useCurrentDistrict from '@/hooks/useCurrentDistrict';
import useChargers from '@/hooks/useChargers';
import useFilters from '@/hooks/useFilters';

import StationHeader from './StationHeader';
import ChargerTable from './ChargerTable';
import StationTable from './StationTable';
import Status from './Status';
import { CarLogoIcon, MarkerErrorIcon } from '../../../public/icons';

const ChargerDetail = ({ isLoadingLocation }: { isLoadingLocation: boolean }) => {
  const { currentStation } = useCurrentStation();
  const { currentDistrict } = useCurrentDistrict();
  const { filterOption } = useFilters();
  const {
    data,
    isLoading: isLoadingData,
    error,
  } = useChargers(currentDistrict || '', filterOption);
  const station = data?.stations.find((station) => station.statId === currentStation);
  const theme = useTheme();

  return (
    <Box w='full' maxW='container.xl' pt={currentStation ? 2 : 20}>
      {isLoadingLocation && (
        <Status
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='현 위치를 찾는 중입니다.'
        />
      )}

      {isLoadingData && (
        <Status
          icon={<Spinner color={theme.colors.primary} size='xl' thickness='3px' />}
          text='충전소 정보를 불러오는 중입니다.'
        />
      )}

      {(!isLoadingData && error) ||
        (!isLoadingData && data && data.chargerCount === 0 && (
          <Status
            icon={<MarkerErrorIcon />}
            text={`충전소 정보를 불러올 수 없습니다.\n다시 시도해주세요.`}
          />
        ))}

      {!isLoadingData && data && data.chargerCount > 0 && !station && (
        <Status icon={<CarLogoIcon />} text='충전소를 선택해주세요.' />
      )}

      {data && station && (
        <>
          <StationHeader station={station} />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <ChargerTable chargers={station.chargers} availableCount={station.availableCount} />
          <Divider h={2} mt={1} mb={1} bg='gray.200' />
          <StationTable station={station} />
          <Text color='gray.400' fontSize='xs' textAlign='center' mt={2} mb={6}>
            데이터 출처: 한국환경공단
          </Text>
        </>
      )}
    </Box>
  );
};

export default ChargerDetail;
