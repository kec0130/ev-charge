import Link from 'next/link';
import Metadata from '@/components/Metadata';

const Blog = () => {
  return (
    <>
      <Metadata
        title='전기차지 - 블로그'
        description='전기차와 관련된 유용한 정보를 알려드립니다.'
        keywords='전기차 블로그, 전기차 정보, 전기차 팁'
        url='/blog'
      />
      <Link href='/blog/electric-car-subsidy'>2023 전기차 보조금, 신청방법 핵심정보 요약</Link>
    </>
  );
};

export default Blog;
