import { Table, Tbody, Tr, Td, TableContainer, Heading, Divider } from '@chakra-ui/react';
import { Charger } from '@/types/charger';
import { FACILITY_TYPE_DETAIL } from '@/constants/chargerCode';

const StationTable = ({ station }: { station: Charger }) => {
  const {
    location,
    limitYn,
    limitDetail,
    parkingFree,
    kindDetail,
    useTime,
    bnm,
    busiCall,
    note,
    delYn,
    delDetail,
  } = station;

  return (
    <TableContainer p={4}>
      <Heading size='sm' mb={3}>
        충전소 정보
      </Heading>
      <Divider w='full' />
      <Table variant='simple' size='sm'>
        <Tbody>
          {location && location !== 'null' && (
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
            <Td>{limitYn === 'N' ? '없음' : limitDetail || '확인 필요'}</Td>
          </Tr>
          <Tr>
            <Td>주차요금</Td>
            <Td>{!parkingFree ? '확인 필요' : parkingFree === 'Y' ? '유료' : '무료'}</Td>
          </Tr>
          {kindDetail && (
            <Tr>
              <Td>장소유형</Td>
              <Td>{FACILITY_TYPE_DETAIL[kindDetail]}</Td>
            </Tr>
          )}
          <Tr>
            <Td>운영시간</Td>
            <Td>{useTime.startsWith('24') ? '24시간' : useTime || '확인 필요'}</Td>
          </Tr>
          <Tr>
            <Td>운영기관</Td>
            <Td>{bnm}</Td>
          </Tr>
          <Tr>
            <Td>연락처</Td>
            <Td>{busiCall}</Td>
          </Tr>

          {delYn === 'Y' && (
            <Tr>
              <Td>삭제 여부</Td>
              <Td>{delDetail || '삭제됨'}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StationTable;
