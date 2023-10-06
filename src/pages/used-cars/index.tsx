import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Metadata from '@/components/Common/Metadata';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    router.replace(`/used-cars/${year}-${month}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Metadata
      title='중고시세'
      description='중고 전기차 시세를 월별로 확인해보세요.'
      keywords='중고 전기차 시세, 전기차 중고 시세, 중고 전기차 가격, 전기차 중고 가격'
      url='/used-cars'
    />
  );
};

export default Page;
