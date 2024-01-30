import { useEffect } from 'react';

const BlogInarticleAds = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-layout='in-article'
      data-ad-format='fluid'
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID_BLOG_INARTICLE}
    ></ins>
  );
};

export default BlogInarticleAds;
