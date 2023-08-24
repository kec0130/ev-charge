import { Table, Tbody, Tr, Td, TableContainer, Heading, Divider } from '@chakra-ui/react';
import { StationDTO } from '@/types/charger';
import { FACILITY_TYPE_DETAIL } from '@/constants/chargerCode';

const NO_DATA = '확인필요';

const StationTable = ({ station }: { station: StationDTO }) => {
  const {
    location,
    note,
    limitDetail,
    parkingFree,
    kindDetail,
    useTime,
    bnm,
    busiCall,
    delDetail,
  } = station;

  return (
    <TableContainer p={4}>
      <Heading as='h3' size='sm' mb={3}>
        충전소 정보
      </Heading>
      <Divider w='full' />
      <Table
        variant='simple'
        size='sm'
        sx={{
          'tr > td:first-of-type': { width: '80px' },
          'tr > td:last-child': { whiteSpace: 'normal' },
        }}
      >
        <Tbody>
          {location && (
            <Tr>
              <Td>상세위치</Td>
              <Td>{location}</Td>
            </Tr>
          )}
          {note && (
            <Tr>
              <Td>안내사항</Td>
              <Td>{note}</Td>
            </Tr>
          )}
          <Tr>
            <Td>이용제한</Td>
            <Td>{limitDetail || '없음'}</Td>
          </Tr>
          <Tr>
            <Td>주차요금</Td>
            <Td>{parkingFree === null ? NO_DATA : parkingFree ? '무료' : '유료'}</Td>
          </Tr>
          {kindDetail && (
            <Tr>
              <Td>장소유형</Td>
              <Td>{FACILITY_TYPE_DETAIL[kindDetail]}</Td>
            </Tr>
          )}
          <Tr>
            <Td>운영시간</Td>
            <Td>{useTime || NO_DATA}</Td>
          </Tr>
          <Tr>
            <Td>운영기관</Td>
            <Td>{bnm || NO_DATA}</Td>
          </Tr>
          <Tr>
            <Td>연락처</Td>
            <Td>{busiCall || NO_DATA}</Td>
          </Tr>
          {delDetail && (
            <Tr>
              <Td>삭제 여부</Td>
              <Td>{delDetail}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StationTable;
