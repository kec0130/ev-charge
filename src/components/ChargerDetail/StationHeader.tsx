import { Box, Divider, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { StationDTO } from '@/types/charger';
import { convertDistance } from '@/utils/charger';
import { CopyIcon } from '../../../public/icons';

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
      <Flex gap={1.5} alignItems='center'>
        <Text fontWeight='semibold'>{convertDistance(distance)}</Text>
        <Divider orientation='vertical' h={4} />
        <Text color='gray.500'>
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
