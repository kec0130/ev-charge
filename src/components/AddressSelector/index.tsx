import useSWR from 'swr';
import { MouseEvent, useEffect, useState } from 'react';
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { CURRENT_DISTRICT_KEY } from '@/constants/map';
import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';

const AddressSelector = () => {
  const { data: districtCode, mutate } = useSWR<string>(CURRENT_DISTRICT_KEY);
  const [displayDistrict, setDisplayDistrict] = useState('');
  const [cityCode, setCityCode] = useState('');

  const handleCityChange = (e: MouseEvent<HTMLButtonElement>) => {
    setCityCode(e.currentTarget.value);
    setDisplayDistrict('');
  };

  const handleDistrictChange = (e: MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.value;
    mutate(key);
    setDisplayDistrict(DISTRICT_CODE[key]);
  };

  useEffect(() => {
    if (!districtCode) return;
    setCityCode(districtCode.slice(0, 2));
    setDisplayDistrict(DISTRICT_CODE[districtCode]);
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
          {displayDistrict || '시/군/구 선택'}
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
