import { useEffect, useState } from 'react';
import type { NaverMap } from '@/types/map';
import type { StationDTO } from '@/types/charger';

// Keep every station pin; only declutter the attached count labels.
export default function useMarkerLabels(
  map: NaverMap | undefined,
  stations: StationDTO[] | undefined,
  selectedId: string,
) {
  const [labels, setLabels] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (!map || !stations) return;
    const update = () => {
      const projection = map.getProjection();
      const size = map.getSize();
      const rectangles: { left: number; top: number; right: number; bottom: number }[] = [];
      const next = new Set<string>();
      const ordered = [...stations].sort(
        (a, b) => Number(b.statId === selectedId) - Number(a.statId === selectedId),
      );
      for (const station of ordered) {
        const point = projection.fromCoordToOffset(
          new naver.maps.LatLng(Number(station.lat), Number(station.lng)),
        );
        if (point.x < 0 || point.y < 0 || point.x > size.width || point.y > size.height) continue;
        const box = {
          left: point.x - 18,
          top: point.y - 43,
          right: point.x + 102,
          bottom: point.y + 12,
        };
        if (
          station.statId === selectedId ||
          !rectangles.some(
            (rect) =>
              box.left < rect.right &&
              box.right > rect.left &&
              box.top < rect.bottom &&
              box.bottom > rect.top,
          )
        ) {
          next.add(station.statId);
          rectangles.push(box);
        }
      }
      setLabels(next);
    };
    update();
    const listener = naver.maps.Event.addListener(map, 'idle', update);
    return () => naver.maps.Event.removeListener(listener);
  }, [map, stations, selectedId]);
  return labels;
}
