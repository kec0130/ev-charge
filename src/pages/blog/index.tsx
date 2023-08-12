import Head from 'next/head';
import Link from 'next/link';

const Blog = () => {
  return (
    <>
      <Head>
        <title>전기차지 | 블로그</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Link href='/blog/electric-car-subsidy'>2023 전기차 보조금, 신청방법 핵심정보 요약</Link>
    </>
  );
};

export default Blog;