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
      data-ad-layout-key={isMobileView ? '-6k+dn+4m-5m-4' : '-ei-8c+ao+gy-tz'}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      data-ad-slot={isMobileView ? '2075885374' : '3388967046'}
    ></ins>
  );
};

export default BlogInfeedAds;
