import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { UsedCar } from '@/types/supabase';
import { getUsedCars } from '@/services/usedCars';
import UsedCars from '@/components/UsedCars';
import Status from '@/components/Common/Status';
import Metadata from '@/components/Common/Metadata';

const UsedCarsPage = ({ usedCars }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (usedCars.length === 0) {
    return <Status type='error' text='중고차 목록을 불러올 수 없습니다.' fullHeight />;
  }

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

export default UsedCarsPage;

export const getStaticProps: GetStaticProps<{ usedCars: UsedCar[] }> = async () => {
  const { usedCars } = await getUsedCars();

  return {
    props: {
      usedCars,
    },
  };
};
