import axios from 'axios';
import { useEffect, useState } from 'react';
import { Coord } from '@/types/map';
import { ChargerDataRes } from '@/types/charger';
import { INITIAL_ZOOM, MAP_ID } from '@/constants/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import Marker from './Marker';

export default function Map() {
  const [map, setMap] = useState<naver.maps.Map>();
  const [chargers, setChargers] = useState<ChargerDataRes>();
  const [districtCode, setDistrictCode] = useState('');
  const { currentLocation, isLoaded } = useCurrentLocation();

  const getChargers = (districtCode: string) =>
    axios.get<ChargerDataRes>(`api/chargers`, { params: { districtCode } }).then((res) => res.data);

  const getDistrictFromCoord = (coord: Coord) => {
    naver.maps.Service.reverseGeocode(
      { coords: new naver.maps.LatLng(...coord) },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          console.log('Failed to reverse geocode.');
        }

        try {
          const city = response.v2.results[0].region.area1.name;
          const district = response.v2.results[0].region.area2.name.split(' ')[0];
          const matchedDistricts = Object.keys(DISTRICT_CODE).filter(
            (key) => DISTRICT_CODE[key] === district
          );

          if (matchedDistricts.length > 1) {
            const matchedCity = Object.keys(CITY_CODE).find((key) => CITY_CODE[key] === city);
            const matchedDistrict = matchedDistricts.find((district) =>
              district.startsWith(matchedCity!)
            );
            setDistrictCode(matchedDistrict || '');
          }
          setDistrictCode(matchedDistricts[0]);
        } catch (e) {
          console.log(response.v2.status.message);
        }
      }
    );
  };

  useEffect(() => {
    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(...currentLocation),
      zoom: INITIAL_ZOOM,
      minZoom: 12,
      scaleControl: true,
      mapDataControl: true,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    };

    const map = new naver.maps.Map(MAP_ID, mapOptions);
    setMap(map);

    map?.morph(new naver.maps.LatLng(...currentLocation), INITIAL_ZOOM);

    if (!isLoaded) return;
    const listener = naver.maps.Event.addListener(map, 'dragend', () => {
      const { x, y } = map.getCenter();
      getDistrictFromCoord([y, x]);
    });

    return () => {
      map?.destroy();
      naver.maps.Event.removeListener(listener);
    };
  }, [currentLocation, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    getDistrictFromCoord(currentLocation);
  }, [currentLocation, isLoaded]);

  useEffect(() => {
    if (!districtCode) return;
    getChargers(districtCode).then(setChargers);
  }, [districtCode]);

  return (
    <div id={MAP_ID} style={{ width: '100%', height: '50vh' }}>
      {isLoaded && <Marker map={map} coord={currentLocation} />}
      {chargers &&
        Object.keys(chargers.data).map((key) => {
          const { lat, lng } = chargers.data[key][0];
          return (
            <Marker
              map={map}
              coord={[parseFloat(lat), parseFloat(lng)]}
              onClick={() => console.log(key)}
              key={key}
            />
          );
        })}
    </div>
  );
}
