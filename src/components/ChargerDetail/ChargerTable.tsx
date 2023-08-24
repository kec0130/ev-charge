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
} from '@chakra-ui/react';

import { ChargerSimpleDTO } from '@/types/charger';
import { CHARGER_TYPE, STATUS } from '@/constants/chargerCode';
import { isFastCharge } from '@/utils/charger';

interface Props {
  chargers: ChargerSimpleDTO[];
  availableCount: number;
}

const ChargerTable = ({ chargers, availableCount }: Props) => {
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
                <Td sx={{ width: '50px' }}>{chgerId}</Td>
                <Td sx={{ width: '90px' }}>{STATUS[stat]}</Td>
                <Td sx={{ width: '100px' }}>
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
