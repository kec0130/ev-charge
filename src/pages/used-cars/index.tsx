import type { GetServerSideProps } from 'next';
import Metadata from '@/components/Common/Metadata';
import { getUsedCarMonths } from '@/services/usedCars';

export default function UsedCarsIndex() {
  return (
    <>
      <Metadata title='중고 전기차 시세' url='/used-cars' />
      <h1 className='page-title'>중고 전기차 시세</h1>
      <p className='page-description'>아직 등록된 가격 기록이 없습니다.</p>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [latestMonth] = await getUsedCarMonths();
  if (!latestMonth) return { props: {} };

  return {
    redirect: {
      destination: `/used-cars/${latestMonth}`,
      permanent: false,
    },
  };
};
