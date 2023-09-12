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
    setCurrentStation(id);
    moveMap(coord);
  };

  return (
    <Box pb={4}>
      <Heading as='h3' size='md' p={4} pt={1}>
        내 주변 충전소
      </Heading>
      {stations.map((station) => {
        const { statId, statNm, distance, addr, lat, lng, markerType } = station;
        return (
          <Fragment key={statId}>
            <Divider />
            <button
              style={{ width: '100%' }}
              onClick={() => handleStationClick(statId, convertToCoord(lat, lng))}
            >
              <Flex p={4} gap={3}>
                <Flex alignItems='center' flexShrink={0}>
                  <Image
                    src={MARKER_IMAGES[markerType]}
                    alt='충전소 아이콘'
                    width={28}
                    height={37}
                  />
                </Flex>
                <Box textAlign='left'>
                  <Text mb={1} fontSize='lg' fontWeight='bold' noOfLines={1}>
                    {statNm}
                  </Text>
                  <Flex alignItems='center'>
                    <Text fontWeight='semibold'>{convertDistance(distance)}</Text>
                    <Divider orientation='vertical' h={4} mx={1.5} borderColor='gray.300' />
                    <Text color='gray.600' noOfLines={1}>
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
