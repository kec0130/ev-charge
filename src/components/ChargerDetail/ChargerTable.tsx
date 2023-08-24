import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Heading,
  Divider,
  Box,
  Text,
  Flex,
  useTheme,
  Circle,
} from '@chakra-ui/react';

import { ChargerSimpleDTO } from '@/types/charger';
import { CHARGER_TYPE, STATUS } from '@/constants/chargerCode';
import { isFastCharge } from '@/utils/charger';

interface Props {
  chargers: ChargerSimpleDTO[];
  availableCount: number;
}

const ChargerTable = ({ chargers, availableCount }: Props) => {
  const theme = useTheme();

  const getStatusColor = (stat: string) => {
    switch (stat) {
      case '2':
        return theme.colors.primary;
      case '3':
        return theme.colors.accent;
      default:
        return theme.colors.gray[300];
    }
  };

  return (
    <TableContainer p={4}>
      <Flex alignItems='center' gap={3} mb={3}>
        <Heading as='h3' size='sm'>
          충전기 현황
        </Heading>
        <Text fontSize='sm' color='gray.500'>
          사용가능 {availableCount}대 / 전체 {chargers.length}대
        </Text>
      </Flex>
      <Divider w='full' />
      <Box
        maxH={200}
        overflowY='auto'
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            bg: 'gray.300',
            borderRadius: '4px',
          },
        }}
      >
        <Table variant='simple' size='sm'>
          <Tbody>
            {chargers.map(({ chgerId, chgerType, output, stat }) => (
              <Tr key={chgerId}>
                <Td w={50}>{chgerId}</Td>
                <Td w={100}>
                  <Flex alignItems='center' gap={1.5}>
                    {STATUS[stat]}
                    <Circle size='7px' bg={getStatusColor(stat)} />
                  </Flex>
                </Td>
                <Td w={50}>
                  {isFastCharge(chgerType) ? '급속' : '완속'} {output && `${output}kW`}
                </Td>
                <Td sx={{ whiteSpace: 'normal' }}>{CHARGER_TYPE[chgerType]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default ChargerTable;
