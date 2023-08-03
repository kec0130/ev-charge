import useSWR, { mutate } from 'swr';
import { MouseEvent, useEffect, useState } from 'react';
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { CURRENT_DISTRICT_KEY } from '@/constants/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import useGeocode from '@/hooks/useGeocode';

const AddressSelector = () => {
  const [cityCode, setCityCode] = useState('');
  const [districtName, setDistrictName] = useState('');
  const { data: districtCode } = useSWR<string>(CURRENT_DISTRICT_KEY);
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
    <Flex pos='absolute' zIndex={100} m={3} gap={3}>
      <Menu>
        <MenuButton as={Button} bgColor='white' size='sm' shadow='base'>
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
        <MenuButton as={Button} bgColor='white' size='sm' shadow='base'>
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
    </Flex>
  );
};

export default AddressSelector;
