import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { UsedCar } from '@/types/supabase';
import { getUsedCarsByMonth } from '@/services/usedCars';
import { generateDateStrings } from '@/utils/usedCars';
import UsedCars from '@/components/UsedCars';
import Metadata from '@/components/Common/Metadata';

const Page = ({ usedCars, month }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Metadata
        title={`${month} 중고 전기차 가격 기록`}
        description={`${month}에 조사한 중고 전기차 매물의 가격 범위입니다. 현재 시세나 실거래가가 아닌 과거 참고 자료입니다.`}
        keywords='중고 전기차 시세, 전기차 중고 시세, 중고 전기차 가격, 전기차 중고 가격'
        url={`/used-cars/${month}`}
      />
      <UsedCars usedCars={usedCars} month={month} />
    </>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const months = generateDateStrings();
  const paths = months.map((month) => ({ params: { month } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ usedCars: UsedCar[]; month: string }> = async ({ params }) => {
  const month = params?.month as string;
  const { usedCars } = await getUsedCarsByMonth(month);
  if (!usedCars.length) return { notFound: true };

  return {
    props: {
      usedCars,
      month,
    },
  };
};
