import { useAtomValue } from 'jotai';
import { MouseEventHandler, useEffect, useState } from 'react';
import { IconButton, MenuItem, useTheme } from '@chakra-ui/react';

import { currentDistrictAtom } from '@/states/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import useGeocode from '@/hooks/useGeocode';
import useCurrentLocation from '@/hooks/useCurrentLocation';

import Selector from './Selector';
import { LocationIcon } from '../../../../public/icons';

const AddressSelector = () => {
  const [cityCode, setCityCode] = useState('');
  const [districtName, setDistrictName] = useState('');
  const currentDistrict = useAtomValue(currentDistrictAtom);

  const { getCurrentLocation } = useCurrentLocation();
  const { geocode } = useGeocode();
  const theme = useTheme();

  const handleCityChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    setCityCode(e.currentTarget.value);
    setDistrictName('');
  };

  const handleDistrictChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    geocode(cityCode, e.currentTarget.value);
    setDistrictName(e.currentTarget.innerText);
  };

  useEffect(() => {
    if (!currentDistrict) return;
    setCityCode(currentDistrict.slice(0, 2));
    setDistrictName(DISTRICT_CODE[currentDistrict]);
  }, [currentDistrict]);

  return (
    <>
      <Selector
        buttonText={cityCode ? CITY_CODE[cityCode] : '시/도 선택'}
        menuList={Object.keys(CITY_CODE)}
        menuObject={CITY_CODE}
        onClick={handleCityChange}
      />

      <Selector
        buttonText={districtName || '시/군/구 선택'}
        menuList={Object.keys(DISTRICT_CODE).filter((key) => key.startsWith(cityCode))}
        menuObject={DISTRICT_CODE}
        onClick={handleDistrictChange}
      />

      <IconButton
        icon={<LocationIcon style={{ fill: theme.colors.warning }} />}
        aria-label='현재 위치로 이동'
        size='sm'
        bgColor='white'
        rounded='full'
        shadow={theme.shadows.onMap}
        onClick={getCurrentLocation}
      />
    </>
  );
};

export default AddressSelector;
