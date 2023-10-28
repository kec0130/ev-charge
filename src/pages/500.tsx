import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import Status from '@/components/Common/Status';

const Custom500 = () => {
  const router = useRouter();

  return (
    <Status
      type='error'
      text={`알 수 없는 오류가 발생했습니다.\n다시 시도해주세요.`}
      footer={<Button onClick={() => router.reload()}>새로고침</Button>}
      fullHeight
    />
  );
};

export default Custom500;
