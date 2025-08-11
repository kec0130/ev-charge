import { useEffect } from 'react';

const MapFixedHeightAds = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'block', width: '100%', height: '80px' }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      data-ad-slot='1733072778'
    ></ins>
  );
};

export default MapFixedHeightAds;
