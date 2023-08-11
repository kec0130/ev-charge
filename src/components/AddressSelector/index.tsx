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
  useTheme,
} from '@chakra-ui/react';

import { CITY_CODE, DISTRICT_CODE } from '@/constants/chargerCode';
import { Coord } from '@/types/map';
import useMap from '@/hooks/useMap';
import useGeocode from '@/hooks/useGeocode';
import useDistrict from '@/hooks/useDistrict';
import useStation from '@/hooks/useStation';

import { ChevronDownIcon, LocationIcon } from '../../../public/icons';

const AddressSelector = ({ currentLocation }: { currentLocation: Coord }) => {
  const [cityCode, setCityCode] = useState('');
  const [districtName, setDistrictName] = useState('');

  const { districtCode, setDistrictCode } = useDistrict();
  const { clearStationId } = useStation();
  const { moveMap } = useMap();
  const { geocode, reverseGeocode } = useGeocode();
  const theme = useTheme();

  const handleCityChange = (e: MouseEvent<HTMLButtonElement>) => {
    setCityCode(e.currentTarget.value);
    setDistrictName('');
  };

  const handleDistrictChange = (e: MouseEvent<HTMLButtonElement>) => {
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
        icon={<LocationIcon style={{ fill: theme.colors.primary }} />}
        aria-label='현재 위치로 이동'
        size='sm'
        shadow='md'
        bgColor='white'
        rounded='full'
        onClick={handleCurrentLocationClick}
      />
    </Flex>
  );
};

export default AddressSelector;
