import { useState } from 'react';
import { Box, Divider, Flex, Heading, IconButton, Text, useTheme } from '@chakra-ui/react';

import { StationDTO } from '@/types/charger';
import { convertDistance } from '@/utils/charger';
import { CheckIcon, CopyIcon } from '../../../../public/icons';

const StationHeader = ({ station }: { station: StationDTO }) => {
  const { statNm, distance, addr } = station;
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleCopy: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box p={4} pt={1}>
      <Heading as='h2' size='md' mb={2}>
        {statNm}
      </Heading>
      <Flex alignItems='center'>
        <Text fontWeight='semibold'>{convertDistance(distance)}</Text>
        <Divider orientation='vertical' h={4} mx={1.5} borderColor='gray.300' />
        <Text color='gray.600'>
          {addr}
          <IconButton
            icon={
              copied ? (
                <CheckIcon style={{ fill: theme.colors.primary }} />
              ) : (
                <CopyIcon style={{ fill: theme.colors.gray[400] }} />
              )
            }
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
