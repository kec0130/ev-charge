import { useState } from 'react';
import { Badge, Box, Divider, Flex, Heading, IconButton, Text, useTheme } from '@chakra-ui/react';

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
    <Box p={4}>
      <Heading as='h2' size='md' mb={2}>
        {statNm}
      </Heading>
      <Flex alignItems='center' gap={3}>
        <Text fontWeight='semibold'>{convertDistance(distance)}</Text>
        <Badge px={2} py={0.5} colorScheme={station.access === 'public' ? 'green' : 'orange'}>
          {station.access === 'public'
            ? '공공데이터상 제한 없음'
            : station.access === 'restricted'
              ? '이용자 제한 있음'
              : '이용 대상 확인 필요'}
        </Badge>
      </Flex>
      <Text fontSize='sm' color='gray.600' my={2}>
        방문 전 운영시간·주차요금·출입 조건을 확인해주세요.
      </Text>
      <Text fontSize='sm' color='gray.600'>
        {addr}
        <IconButton
          icon={
            copied ? (
              <CheckIcon style={{ fill: theme.colors.primary, width: '16px', height: '16px' }} />
            ) : (
              <CopyIcon style={{ fill: theme.colors.gray[400], width: '16px', height: '16px' }} />
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
    </Box>
  );
};

export default StationHeader;
