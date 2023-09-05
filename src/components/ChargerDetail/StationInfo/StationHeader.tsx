import { Box, Divider, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { StationDTO } from '@/types/charger';
import { convertDistance } from '@/utils/charger';
import { CopyIcon } from '../../../../public/icons';

const StationHeader = ({ station }: { station: StationDTO }) => {
  const { statNm, distance, addr } = station;

  const handleCopy: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;
    navigator.clipboard.writeText(value);
  };

  return (
    <Box p={4}>
      <Heading as='h2' size='md' mb={2}>
        {statNm}
      </Heading>
      <Flex alignItems='center'>
        <Text fontWeight='semibold'>{convertDistance(distance)}</Text>
        <Divider orientation='vertical' h={4} mx={1.5} borderColor='gray.300' />
        <Text color='gray.600'>
          {addr}
          <IconButton
            icon={<CopyIcon style={{ fill: 'var(--chakra-colors-gray-400)' }} />}
            aria-label='복사하기'
            size='xs'
            variant='ghost'
            verticalAlign='sub'
            value={addr}
            onClick={handleCopy}
          />
        </Text>
      </Flex>
    </Box>
  );
};

export default StationHeader;
