import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import Status from '@/components/Common/Status';

interface Props {
  text?: string;
  footer?: React.ReactNode;
}

const ErrorPage = ({ text, footer }: Props) => {
  const router = useRouter();

  return (
    <Status
      type='error'
      text={text || `오류가 발생했습니다.\n다시 시도해주세요.`}
      footer={footer || <Button onClick={() => router.reload()}>새로고침</Button>}
      fullHeight
    />
  );
};

export default ErrorPage;
