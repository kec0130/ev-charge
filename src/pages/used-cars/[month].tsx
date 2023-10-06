import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { UsedCar } from '@/types/supabase';
import { getMonths, getUsedCarsByMonth } from '@/services/usedCars';
import UsedCars from '@/components/UsedCars';
import Metadata from '@/components/Common/Metadata';

const Page = ({ usedCars }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Metadata
        title='중고시세'
        description='중고 전기차 시세를 월별로 확인해보세요.'
        keywords='중고 전기차 시세, 전기차 중고 시세, 중고 전기차 가격, 전기차 중고 가격'
        url='/used-cars'
      />
      <UsedCars usedCars={usedCars} />
    </>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const { months } = await getMonths();
  const paths = months.map((month) => ({ params: { month } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ usedCars: UsedCar[] }> = async ({ params }) => {
  const { usedCars } = await getUsedCarsByMonth(params?.month as string);

  return {
    props: {
      usedCars,
    },
  };
};
