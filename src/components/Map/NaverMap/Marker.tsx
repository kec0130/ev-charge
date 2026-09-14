import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import type { Coord, NaverMap } from '@/types/map';
import type { StationDTO } from '@/types/charger';
import { currentStationAtom, filterOptionAtom, stationSheetAtom } from '@/states/map';
import { stationMarkerContent } from '@/utils/stationPresentation';

export default function Marker({
  map,
  coord,
  station,
  isSelected = false,
  isCurrentLocation = false,
  showLabel = true,
}: {
  map?: NaverMap;
  coord: Coord;
  station?: StationDTO;
  isSelected?: boolean;
  isCurrentLocation?: boolean;
  showLabel?: boolean;
}) {
  const setCurrentStation = useSetAtom(currentStationAtom);
  const setSheet = useSetAtom(stationSheetAtom);
  const { onlyFastCharger } = useAtomValue(filterOptionAtom);
  const [lat, lng] = coord;
  useEffect(() => {
    if (!map) return;
    const content = isCurrentLocation
      ? '<div class="user-location" role="img" aria-label="내 위치"></div>'
      : station
        ? stationMarkerContent(station, isSelected, onlyFastCharger, showLabel)
        : '';
    if (!content) return;
    const element = document.createElement('div');
    element.innerHTML = content;
    const marker = new naver.maps.Marker({
      map,
      position: new naver.maps.LatLng(lat, lng),
      icon: {
        content: element,
        anchor: new naver.maps.Point(isCurrentLocation ? 11 : 16, isCurrentLocation ? 11 : 40),
      },
      zIndex: isCurrentLocation ? 3 : isSelected ? 2 : 1,
    });
    const select = () => {
      if (!station) return;
      setCurrentStation(station.statId);
      if (window.matchMedia('(max-width: 767px)').matches) setSheet('preview');
    };
    const listener = naver.maps.Event.addListener(marker, 'click', select);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select();
      }
    };
    element?.addEventListener('keydown', keydown);
    return () => {
      element?.removeEventListener('keydown', keydown);
      naver.maps.Event.removeListener(listener);
      marker.setMap(null);
    };
  }, [
    map,
    lat,
    lng,
    station,
    isSelected,
    isCurrentLocation,
    onlyFastCharger,
    setCurrentStation,
    setSheet,
    showLabel,
  ]);
  return null;
}
