import { Heading, List, Text } from '@chakra-ui/react';
import { UsedCar } from '@/types/supabase';
import UsedCarListItem from './ListItem';

const UsedCars = ({ usedCars }: { usedCars: UsedCar[] }) => {
  return (
    <>
      <Heading as='h2' size={['lg', 'xl']}>
        중고 전기차 시세
      </Heading>
      <Text mt={[2, 4]} mb={[6, 8]} color='gray.500'>
        2023년 9월 중고 전기차의 시세를 확인해보세요.
        <br />이 데이터는 온라인으로 검색된 중고매물의 가격 분포를 조사한 것으로 대략적인 시세
        파악에 참고해주시기 바랍니다.
      </Text>
      <List>
        {usedCars.map((usedCar, index) => (
          <UsedCarListItem key={usedCar.id} usedCar={usedCar} index={index} />
        ))}
      </List>
    </>
  );
};

export default UsedCars;
