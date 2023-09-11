import Status from '@/components/Common/Status';

const Custom404 = () => {
  return (
    <Status type='error' text={`페이지를 찾을 수 없습니다.\nURL을 확인해주세요.`} fullHeight />
  );
};

export default Custom404;
