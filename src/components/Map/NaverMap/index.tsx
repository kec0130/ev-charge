import { useEffect, useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { INITIAL_CENTER, INITIAL_ZOOM, MAP_ID } from '@/constants/map';
import { currentStationAtom } from '@/states/map';
import useMap from '@/hooks/useMap';
import useGeocode from '@/hooks/useGeocode';
import Icon from '@/components/Common/Icon';

export default function NaverMap({ children }: { children: React.ReactNode }) {
  const { setMap } = useMap();
  const { reverseGeocode } = useGeocode();
  const setCurrentStation = useSetAtom(currentStationAtom);
  const reverseRef = useRef(reverseGeocode);
  reverseRef.current = reverseGeocode;
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let instance: naver.maps.Map | undefined;
    let observer: ResizeObserver | undefined;
    const listeners: naver.maps.MapEventListener[] = [];
    const started = Date.now();
    setStatus('loading');
    const initialize = () => {
      if (typeof naver === 'undefined' || !naver.maps?.Map) {
        if (Date.now() - started > 12000) {
          setStatus('error');
          clearInterval(timer);
        }
        return;
      }
      clearInterval(timer);
      try {
        instance = new naver.maps.Map(MAP_ID, {
          center: new naver.maps.LatLng(...INITIAL_CENTER),
          zoom: INITIAL_ZOOM,
          minZoom: 12,
          maxZoom: 18,
          mapDataControl: false,
          zoomControl: false,
          scaleControl: true,
          logoControl: true,
        });
        setMap(instance);
        setStatus('ready');
        listeners.push(
          naver.maps.Event.addListener(instance, 'dragend', () => {
            if (!instance) return;
            const center = instance.getCenter();
            reverseRef.current([center.y, center.x]);
          }),
        );
        const container = document.getElementById(MAP_ID);
        observer = new ResizeObserver(() => {
          if (instance && container)
            instance.setSize(new naver.maps.Size(container.clientWidth, container.clientHeight));
        });
        if (container) observer.observe(container);
      } catch {
        setStatus('error');
      }
    };
    const timer = setInterval(initialize, 100);
    initialize();
    return () => {
      clearInterval(timer);
      observer?.disconnect();
      if (listeners.length) naver.maps.Event.removeListener(listeners);
      instance?.destroy();
      setMap(undefined);
      setCurrentStation('');
    };
    // SDK setup is tied to mounting/retry, not the changing map cache.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);
  return (
    <>
      <div id={MAP_ID} className='naver-map'>
        {children}
      </div>
      {status !== 'ready' && (
        <div className='map-load-message' role='status'>
          <Icon name='map' size={38} />
          <h2>{status === 'loading' ? '지도를 불러오고 있어요' : '지도를 불러오지 못했어요'}</h2>
          <p>
            {status === 'loading'
              ? '잠시만 기다려주세요.'
              : '인터넷 연결을 확인한 뒤 다시 시도해주세요.'}
          </p>
          {status === 'error' && (
            <button className='outline-button' onClick={() => setAttempt((value) => value + 1)}>
              다시 시도
            </button>
          )}
        </div>
      )}
    </>
  );
}
