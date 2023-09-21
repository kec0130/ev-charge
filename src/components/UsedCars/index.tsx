import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { Heading, List, Text } from '@chakra-ui/react';

import { UsedCar } from '@/types/supabase';
import { SortOption } from '@/types/usedCars';
import UsedCarListItem from './ListItem';
import SearchBar from './SearchBar';
import Status from '../Common/Status';
import AdSense from '../Common/AdSense';

const UsedCars = ({ usedCars }: { usedCars: UsedCar[] }) => {
  const [inputValue, setInputValue] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [searchResult, setSearchResult] = useState<UsedCar[]>(usedCars);

  const searchCars = (arr: UsedCar[], query: string) => {
    const cleanString = (str: string) => str.replaceAll(' ', '').toLowerCase();
    return arr.filter((usedCar) => cleanString(usedCar.name).includes(cleanString(query)));
  };

  const sortCars = (arr: UsedCar[], option: SortOption) =>
    arr.sort((a, b) => {
      if (option === 'name') return a.name.localeCompare(b.name, 'ko');
      if (option === 'minPrice') return a.min_price - b.min_price;
      if (option === 'maxPrice') return b.max_price - a.max_price;
      return 0;
    });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setSearchResult(searchCars(usedCars, value));
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
        중고 전기차 시세
      </Heading>
      <Text color='gray.500' my={[2, 4]}>
        2023년 9월 중고 전기차의 시세를 확인해보세요.
        <br />이 데이터는 온라인으로 검색된 중고매물의 가격 분포를 조사한 것으로 대략적인 시세
        파악에 참고해주시기 바랍니다.
      </Text>
      <AdSense />

      <SearchBar
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleClearButtonClick={handleClearButtonClick}
        sortOption={sortOption}
        handleSortOptionChange={handleSortOptionChange}
      />
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
