import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Flex, Spinner, useTheme } from '@chakra-ui/react';

import { getMonthQuery } from '@/utils/usedCars';
import Metadata from '@/components/Common/Metadata';

const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const month = getMonthQuery();

  useEffect(() => {
    router.replace(`/used-cars/${month}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Metadata
        title='중고시세'
        description='중고 전기차 시세를 월별로 확인해보세요.'
        keywords='중고 전기차 시세, 전기차 중고 시세, 중고 전기차 가격, 전기차 중고 가격'
        url='/used-cars'
      />
      <Flex justifyContent='center' alignItems='center' h='50dvh'>
        <Spinner color={theme.colors.primary} size='xl' thickness='3px' />
      </Flex>
    </>
  );
};

export default Page;
