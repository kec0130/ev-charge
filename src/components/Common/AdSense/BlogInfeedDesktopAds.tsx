import { useEffect } from 'react';

const BlogInfeedDesktopAds = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'block' }}
      data-ad-format='fluid'
      data-ad-layout-key='-eh-8e+af+h0-t6'
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID_BLOG_INFEED_DESKTOP}
    ></ins>
  );
};

export default BlogInfeedDesktopAds;
