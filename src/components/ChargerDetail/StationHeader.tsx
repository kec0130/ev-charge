import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { Charger } from '@/types/charger';
import { CopyIcon } from '../../../public/icons';

const StationHeader = ({ station }: { station: Charger }) => {
  const handleCopy: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;
    navigator.clipboard.writeText(value);
  };

  return (
    <Box p={4}>
      <Heading as='h1' size='md' mb={2}>
        {station.statNm}
      </Heading>
      <Flex gap={1}>
        <Text>{station.addr}</Text>
        <IconButton
          icon={<CopyIcon style={{ fill: 'var(--chakra-colors-gray-400)' }} />}
          aria-label='복사하기'
          size='xs'
          variant='ghost'
          value={station.addr}
          onClick={handleCopy}
        />
      </Flex>
    </Box>
  );
};

export default StationHeader;
