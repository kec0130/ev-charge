import { useAtomValue } from 'jotai';
import {
  currentLocationAtom,
  currentStationAtom,
  isLoadingLocationAtom,
  isLocationOffAtom,
} from '@/states/map';
import { convertToCoord } from '@/utils/charger';
import useMap from '@/hooks/useMap';
import useChargers from '@/hooks/useChargers';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useMarkerLabels from '@/hooks/useMarkerLabels';
import ChargerDetail from '@/components/ChargerDetail';
import Icon from '@/components/Common/Icon';
import NaverMap from './NaverMap';
import Marker from './NaverMap/Marker';
import OptionControl from './OptionControl';

export default function Map() {
  const currentStation = useAtomValue(currentStationAtom);
  const location = useAtomValue(currentLocationAtom);
  const loadingLocation = useAtomValue(isLoadingLocationAtom);
  const locationOff = useAtomValue(isLocationOffAtom);
  const { map } = useMap();
  const { data } = useChargers();
  const labels = useMarkerLabels(map, data?.stations, currentStation);
  const { getCurrentLocation } = useCurrentLocation();
  return (
    <div className='map-workspace'>
      <aside className='map-sidebar' aria-label='충전소 탐색'>
        <OptionControl />
        <ChargerDetail />
      </aside>
      <section className='map-region' aria-label='전기차 충전소 지도'>
        <NaverMap>
          {!loadingLocation && !locationOff && (
            <Marker map={map} coord={location} isCurrentLocation />
          )}
          {data?.stations.map((station) => (
            <Marker
              key={station.statId}
              map={map}
              coord={convertToCoord(station.lat, station.lng)}
              station={station}
              isSelected={station.statId === currentStation}
              showLabel={labels.has(station.statId)}
            />
          ))}
        </NaverMap>
        <div className='map-tool-buttons'>
          <button
            className='map-icon-button'
            aria-label='내 위치 찾기'
            onClick={getCurrentLocation}
          >
            <Icon name='locate' />
          </button>
          <button
            className='map-icon-button zoom-button'
            aria-label='지도 확대'
            onClick={() => map?.setZoom(Math.min(18, map.getZoom() + 1), true)}
          >
            <Icon name='plus' />
          </button>
          <button
            className='map-icon-button zoom-button'
            aria-label='지도 축소'
            onClick={() => map?.setZoom(Math.max(12, map.getZoom() - 1), true)}
          >
            <Icon name='minus' />
          </button>
        </div>
        <div className='map-legend' aria-label='충전소 마커 색상 안내'>
          <span className='legend-item'>
            <i className='legend-dot' />
            급속 가능
          </span>
          <span className='legend-item'>
            <i className='legend-dot slow' />
            완속만 가능
          </span>
          <span className='legend-item'>
            <i className='legend-dot unavailable' />
            이용 불가·미확인
          </span>
          <span className='legend-item'>
            <i className='legend-dot location' />내 위치
          </span>
        </div>
      </section>
    </div>
  );
}
