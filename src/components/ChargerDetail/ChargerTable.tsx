import { Table, Tbody, Tr, Td, TableContainer, Heading, Divider } from '@chakra-ui/react';
import useChargerDetail from '@/hooks/useChargerDetail';

const ChargerTable = () => {
  const { chargers } = useChargerDetail();

  if (!chargers) return null;

  return (
    <TableContainer p={4}>
      <Heading size='sm' mb={3}>
        충전기 현황
      </Heading>
      <Divider w='full' />
      <Table variant='simple' size='sm'>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ChargerTable;
