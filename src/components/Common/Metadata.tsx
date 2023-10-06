import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  url: string;
  image?: string;
}

const DEFAULT_META: Required<Props> = {
  title: '전기차 충전소 찾기',
  description: '전기차 충전소의 위치와 상세 정보, 실시간 충전 현황을 지도에서 확인하세요.',
  keywords: '전기차, 충전소, 전기차 충전소, 충전소 위치, 충전소 정보, 충전기 현황, 급속 충전',
  url: 'https://ev-charge.kr',
  image: '/og.png',
};

const Metadata = ({
  title = DEFAULT_META.title,
  description = DEFAULT_META.description,
  keywords = DEFAULT_META.keywords,
  url,
  image = DEFAULT_META.image,
}: Props) => {
  const titleTemplate = `${title} - 전기차G`;
  const fullUrl = `${DEFAULT_META.url}${url}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{titleTemplate}</title>
      <meta name='title' content={titleTemplate} />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:title' content={titleTemplate} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:locale' content='ko_KR' />
      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={fullUrl} />
      <meta property='twitter:title' content={titleTemplate} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />
    </Head>
  );
};

export default Metadata;
