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

import { Charger } from '@/types/charger';
import { CHARGER_TYPE, STATUS } from '@/constants/chargerCode';

const ChargerTable = ({ chargers }: { chargers: Charger[] }) => {
  return (
    <TableContainer p={4}>
      <Flex alignItems='center' gap={3} mb={3}>
        <Heading as='h3' size='sm'>
          충전기 현황
        </Heading>
        <Text fontSize='sm' color='gray.500'>
          사용가능 {chargers.filter((charger) => charger.stat === '2').length}대 / 전체{' '}
          {chargers.length}대
        </Text>
      </Flex>
      <Divider w='full' />
      <Box
        maxH={200}
        overflowY='auto'
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            bg: 'gray.300',
            borderRadius: '4px',
          },
        }}
      >
        <Table variant='simple' size='sm'>
          <Tbody>
            {chargers.map((charger) => {
              const { chgerId, chgerType, output, stat } = charger;
              return (
                <Tr key={chgerId}>
                  <Td sx={{ width: '50px' }}>{chgerId}</Td>
                  <Td sx={{ width: '90px' }}>{STATUS[stat]}</Td>
                  {output && (
                    <Td sx={{ width: '100px' }}>
                      {parseInt(output) >= 50 ? '급속' : '완속'} {output}kW
                    </Td>
                  )}
                  <Td sx={{ whiteSpace: 'normal' }}>{CHARGER_TYPE[chgerType]}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default ChargerTable;
