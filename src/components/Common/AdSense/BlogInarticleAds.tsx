import { useEffect, useRef, useState } from 'react';

const BlogInarticleAds = ({ placement = 'inline' }: { placement?: 'top' | 'bottom' | 'inline' }) => {
  const adRef = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  const [unfilled, setUnfilled] = useState(false);
  const client = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID;

  useEffect(() => {
    const ad = adRef.current;
    if (process.env.NODE_ENV !== 'production' || !client || !ad) return;

    const statusObserver = new MutationObserver(() => {
      if (ad.dataset.adStatus === 'unfilled') setUnfilled(true);
    });
    statusObserver.observe(ad, { attributes: true, attributeFilter: ['data-ad-status'] });

    const requestAd = () => {
      // In-article ads require at least 250px of available width.
      if (requested.current || ad.dataset.adsbygoogleStatus || ad.clientWidth < 250) return;
      requested.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // An ad failure must not interrupt the article or leave an empty frame.
        setUnfilled(true);
      }
    };
    const resizeObserver = new ResizeObserver(requestAd);
    resizeObserver.observe(ad);
    requestAd();
    return () => {
      statusObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [client, unfilled]);

  if (!client || unfilled) return null;

  return (
    <aside className='article-ad' aria-label='광고' data-ad-placement={placement}>
      <span className='article-ad-label'>광고</span>
      <ins
        ref={adRef}
        className='adsbygoogle'
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout='in-article'
        data-ad-format='fluid'
        data-ad-client={client}
        data-ad-slot='8995781868'
        data-full-width-responsive='false'
      ></ins>
    </aside>
  );
};

export default BlogInarticleAds;
