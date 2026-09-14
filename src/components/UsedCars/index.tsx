import { useRouter } from 'next/router';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Alert, AlertIcon, Box, Heading, List, Text } from '@chakra-ui/react';

import { UsedCar } from '@/types/supabase';
import { SortOption } from '@/types/usedCars';
import UsedCarListItem from './ListItem';
import SearchBar from './SearchBar';
import Options from './Options';
import Status from '../Common/Status';
import ResponsiveAds from '../Common/AdSense/ResponsiveAds';

const UsedCars = ({ usedCars, month }: { usedCars: UsedCar[]; month: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [searchResult, setSearchResult] = useState<UsedCar[]>(usedCars);
  const router = useRouter();

  useEffect(() => {
    setInputValue('');
    setSearchResult(sortCars(usedCars, sortOption));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.month]);

  const searchCars = (arr: UsedCar[], query: string) => {
    const cleanString = (str: string) => str.replaceAll(' ', '').toLowerCase();
    return arr.filter((usedCar) => cleanString(usedCar.name).includes(cleanString(query)));
  };

  const sortCars = (arr: UsedCar[], option: SortOption) =>
    [...arr].sort((a, b) => {
      if (option === 'name') return a.name.localeCompare(b.name, 'ko');
      if (option === 'minPrice') return a.min_price - b.min_price;
      if (option === 'maxPrice') return b.max_price - a.max_price;
      return 0;
    });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setSearchResult(sortCars(searchCars(usedCars, value), sortOption));
  };

  const handleClearButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    setInputValue('');
    setSearchResult(sortCars(usedCars, sortOption));
  };

  const handleSortOptionChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    setSortOption(value as SortOption);
    setSearchResult((prev) => sortCars(prev, value as SortOption));
  };

  return (
    <>
      <Heading as='h2' size={['lg', 'xl']}>
        중고 전기차 가격 기록
      </Heading>
      <Text color='gray.500' my={[2, 4]}>
        {month.replace('-', '년 ')}월에 온라인 중고매물에서 조사한 차종별 가격 범위입니다.
        연식·주행거리·트림·사고 이력을 통제한 통계나 실거래가는 아닙니다.
      </Text>
      <Alert status='info' alignItems='flex-start' borderRadius='md' mb={4}>
        <AlertIcon />
        <Text fontSize='sm'>
          과거 자료입니다. 가격 자료는 2024년 5월까지 제공하며, 현재 시세는 중고차 전문 사이트의
          최신 매물에서 확인해주세요.
        </Text>
      </Alert>
      <ResponsiveAds />

      <Box my={[6, 8]}>
        <Options sortOption={sortOption} handleSortOptionChange={handleSortOptionChange} />
        <SearchBar
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleClearButtonClick={handleClearButtonClick}
        />
      </Box>

      <List>
        {searchResult.length === 0 && <Status type='error' text='검색 결과가 없습니다.' />}
        {searchResult.map((usedCar, index) => (
          <UsedCarListItem key={usedCar.id} usedCar={usedCar} index={index} />
        ))}
      </List>
    </>
  );
};

export default UsedCars;
