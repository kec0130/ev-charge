import { MouseEventHandler, useEffect, useState } from 'react';
import { IconButton, MenuItem, useTheme } from '@chakra-ui/react';

import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import { Coord } from '@/types/map';
import useMap from '@/hooks/useMap';
import useGeocode from '@/hooks/useGeocode';
import useDistrict from '@/hooks/useDistrict';
import useStation from '@/hooks/useStation';

import Selector from './Selector';
import { LocationIcon } from '../../../../public/icons';

const AddressSelector = ({ currentLocation }: { currentLocation: Coord }) => {
  const [cityCode, setCityCode] = useState('');
  const [districtName, setDistrictName] = useState('');

  const { districtCode, setDistrictCode } = useDistrict();
  const { clearStationId } = useStation();
  const { moveMap } = useMap();
  const { geocode, reverseGeocode } = useGeocode();
  const theme = useTheme();

  const handleCityChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    setCityCode(e.currentTarget.value);
    setDistrictName('');
  };

  const handleDistrictChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value: newDistrictCode, innerText: newDistrictName } = e.currentTarget;
    setDistrictCode(newDistrictCode);
    setDistrictName(newDistrictName);
    geocode(cityCode, newDistrictCode);
    clearStationId();
  };

  const handleCurrentLocationClick = () => {
    moveMap(currentLocation);
    reverseGeocode(currentLocation);
  };

  useEffect(() => {
    if (!districtCode) return;
    setCityCode(districtCode.slice(0, 2));
    setDistrictName(DISTRICT_CODE[districtCode]);
  }, [districtCode]);

  return (
    <>
      <Selector buttonText={cityCode ? CITY_CODE[cityCode] : '시/도 선택'}>
        {Object.keys(CITY_CODE).map((key) => (
          <MenuItem key={key} value={key} onClick={handleCityChange}>
            {CITY_CODE[key]}
          </MenuItem>
        ))}
      </Selector>

      <Selector buttonText={districtName || '시/군/구 선택'}>
        {Object.keys(DISTRICT_CODE)
          .filter((key) => key.startsWith(cityCode))
          .map((key) => (
            <MenuItem key={key} value={key} onClick={handleDistrictChange}>
              {DISTRICT_CODE[key]}
            </MenuItem>
          ))}
      </Selector>

      <IconButton
        icon={<LocationIcon style={{ fill: theme.colors.warning }} />}
        aria-label='현재 위치로 이동'
        size='sm'
        bgColor='white'
        rounded='full'
        onClick={handleCurrentLocationClick}
      />
    </>
  );
};

export default AddressSelector;
