import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import ErrorPage from '@/components/Common/ErrorPage';

const Custom404 = () => {
  return (
    <ErrorPage
      text={`페이지를 찾을 수 없습니다.\nURL을 확인해주세요.`}
      footer={
        <Button as={Link} href='/'>
          홈으로 돌아가기
        </Button>
      }
    />
  );
};

export default Custom404;
