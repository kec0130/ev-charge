import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import Status from '@/components/Common/Status';

const Custom404 = () => {
  return (
    <Status
      type='error'
      text={`페이지를 찾을 수 없습니다.\nURL을 확인해주세요.`}
      footer={
        <Button as={Link} href='/'>
          홈으로 돌아가기
        </Button>
      }
      fullHeight
    />
  );
};

export default Custom404;
