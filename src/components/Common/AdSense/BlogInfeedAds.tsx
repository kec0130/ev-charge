import { useEffect, useState } from 'react';

const BlogInfeedAds = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(window.innerWidth < 480);
    if (process.env.NODE_ENV !== 'production') return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'block' }}
      data-ad-format='fluid'
      data-ad-layout-key={isMobileView ? '-6o+dn+4m-5m-4' : '-eh-8e+af+h0-t6'}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      data-ad-slot={
        isMobileView
          ? process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID_BLOG_INFEED_MOBILE
          : process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID_BLOG_INFEED_DESKTOP
      }
    ></ins>
  );
};

export default BlogInfeedAds;
