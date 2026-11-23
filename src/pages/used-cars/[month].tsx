import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getUsedCarMonths, getUsedCarsByMonth } from '@/services/usedCars';
import { getUsedCarMonthRange } from '@/utils/usedCars';
import UsedCars from '@/components/UsedCars';
import Metadata from '@/components/Common/Metadata';

const Page = ({ usedCars, month, months }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Metadata
        title={`${month} 중고 전기차 가격 기록`}
        description={`${month}에 조사한 중고 전기차 매물의 가격 범위입니다. 현재 시세나 실거래가가 아닌 과거 참고 자료입니다.`}
        keywords='중고 전기차 시세, 전기차 중고 시세, 중고 전기차 가격, 전기차 중고 가격'
        url={`/used-cars/${month}`}
      />
      <UsedCars usedCars={usedCars} month={month} months={months} />
    </>
  );
};

export default Page;

export const getServerSideProps = (async ({ params }) => {
  const month = params?.month;
  if (typeof month !== 'string') return { notFound: true };
  const range = getUsedCarMonthRange(month);
  if (!range) return { notFound: true };

  const [usedCars, months] = await Promise.all([getUsedCarsByMonth(range), getUsedCarMonths()]);
  if (!usedCars.length) return { notFound: true };

  return {
    props: {
      usedCars,
      month,
      months,
    },
  };
}) satisfies GetServerSideProps;
