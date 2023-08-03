import useSWR, { mutate } from 'swr';
import { MouseEvent, useEffect, useState } from 'react';
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';

import { CURRENT_DISTRICT_KEY, INITIAL_ZOOM, MAP_KEY } from '@/constants/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import { Coord } from '@/types/map';
import useGeocode from '@/hooks/useGeocode';
import { ChevronDownIcon, LocationIcon } from '../../../public/icons';

const AddressSelector = ({ currentLocation }: { currentLocation: Coord }) => {
  const [cityCode, setCityCode] = useState('');
  const [districtName, setDistrictName] = useState('');
  const { data: districtCode } = useSWR<string>(CURRENT_DISTRICT_KEY);
  const { data: map } = useSWR<naver.maps.Map>(MAP_KEY);
  const { geocode } = useGeocode();

  const handleCityChange = (e: MouseEvent<HTMLButtonElement>) => {
    setCityCode(e.currentTarget.value);
    setDistrictName('');
  };

  const handleDistrictChange = (e: MouseEvent<HTMLButtonElement>) => {
    const { value: newDistrictCode, innerText: newDistrictName } = e.currentTarget;
    mutate(CURRENT_DISTRICT_KEY, newDistrictCode);
    setDistrictName(newDistrictName);
    geocode(cityCode, newDistrictCode);
  };

  useEffect(() => {
    if (!districtCode) return;
    setCityCode(districtCode.slice(0, 2));
    setDistrictName(DISTRICT_CODE[districtCode]);
  }, [districtCode]);

  return (
    <Flex pos='absolute' zIndex={100} w='full' p={3} gap={3}>
      <Menu>
        <MenuButton
          as={Button}
          size='sm'
          shadow='md'
          bgColor='white'
          rightIcon={<ChevronDownIcon />}
        >
          {cityCode ? CITY_CODE[cityCode] : '시/도 선택'}
        </MenuButton>
        <MenuList
          maxH='30vh'
          overflowY='scroll'
          fontSize='sm'
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {Object.keys(CITY_CODE).map((key) => (
            <MenuItem key={key} value={key} onClick={handleCityChange}>
              {CITY_CODE[key]}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          as={Button}
          size='sm'
          shadow='md'
          bgColor='white'
          rightIcon={<ChevronDownIcon />}
        >
          {districtName || '시/군/구 선택'}
        </MenuButton>
        <MenuList
          maxH='30vh'
          overflowY='scroll'
          fontSize='sm'
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {Object.keys(DISTRICT_CODE)
            .filter((key) => key.startsWith(cityCode))
            .map((key) => (
              <MenuItem key={key} value={key} onClick={handleDistrictChange}>
                {DISTRICT_CODE[key]}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>

      <Spacer />
      <IconButton
        icon={<LocationIcon />}
        aria-label='현재 위치로 이동'
        size='sm'
        shadow='md'
        bgColor='white'
        onClick={() => map?.morph(new naver.maps.LatLng(...currentLocation), INITIAL_ZOOM)}
      />
    </Flex>
  );
};

export default AddressSelector;
