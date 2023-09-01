import Image from 'next/image';
import { Fragment } from 'react';
import { useSetAtom } from 'jotai';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

import { Coord } from '@/types/map';
import { StationDTO } from '@/types/charger';
import { currentStationAtom } from '@/states/map';
import { convertDistance, convertToCoord } from '@/utils/charger';
import { MARKER_IMAGES } from '@/constants/map';
import useMap from '@/hooks/useMap';

const NearbyStations = ({ stations }: { stations: StationDTO[] }) => {
  const setCurrentStation = useSetAtom(currentStationAtom);
  const { moveMap } = useMap();

  const handleStationClick = (id: string, coord: Coord) => {
    window.scrollTo({ top: 0 });
    setCurrentStation(id);
    moveMap(coord);
  };

  return (
    <Box w='full' maxW='container.xl' p={4}>
      <Heading as='h3' size='md' py={2}>
        내 주변 충전소
      </Heading>

      {stations.map((station) => {
        const { statId, statNm, distance, addr, lat, lng, markerType } = station;
        return (
          <Fragment key={statId}>
            <Divider my={2} bg='gray.200' />
            <button
              style={{ width: '100%' }}
              onClick={() => handleStationClick(statId, convertToCoord(lat, lng))}
            >
              <Flex py={2} gap={4}>
                <Flex alignItems='center'>
                  <Image
                    src={MARKER_IMAGES[markerType]}
                    alt='충전소 아이콘'
                    width={24}
                    height={32}
                  />
                </Flex>
                <Box textAlign='left'>
                  <Text mb={1} fontSize='lg' fontWeight='bold' noOfLines={1}>
                    {statNm}
                  </Text>
                  <Flex gap={1.5} alignItems='center'>
                    <Text fontWeight='semibold'>{convertDistance(distance)}</Text>
                    <Divider orientation='vertical' h={4} />
                    <Text color='gray.500' noOfLines={1}>
                      {addr}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </button>
          </Fragment>
        );
      })}
    </Box>
  );
};

export default NearbyStations;
