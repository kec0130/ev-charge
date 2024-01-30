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
      data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID_MAP}
    ></ins>
  );
};

export default MapFixedHeightAds;
