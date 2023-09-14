import { ChangeEventHandler, MouseEventHandler } from 'react';
import {
  CloseButton,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  useTheme,
} from '@chakra-ui/react';

import { SortOption } from '@/types/usedCars';
import { SearchIcon } from '../../../public/icons';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name', label: '가나다순' },
  { value: 'minPrice', label: '최저가 낮은 순' },
  { value: 'maxPrice', label: '최고가 높은 순' },
];

interface Props {
  inputValue: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleClearButtonClick: MouseEventHandler<HTMLButtonElement>;
  sortOption: string;
  handleSortOptionChange: ChangeEventHandler<HTMLSelectElement>;
}

const SearchBar = ({
  inputValue,
  handleInputChange,
  handleClearButtonClick,
  sortOption,
  handleSortOptionChange,
}: Props) => {
  const theme = useTheme();

  return (
    <Flex alignItems='center' flexWrap='wrap' gap={4} my={[4, 8]}>
      <InputGroup flex={1} minW='288px'>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon style={{ fill: theme.colors.gray[500] }} />
        </InputLeftElement>
        <Input
          placeholder='모델명을 입력하세요.'
          focusBorderColor={theme.colors.primary}
          rounded='full'
          value={inputValue}
          onChange={handleInputChange}
        />
        <InputRightElement>
          <CloseButton rounded='full' size='sm' color='gray.500' onClick={handleClearButtonClick} />
        </InputRightElement>
      </InputGroup>

      <Select
        variant='unstyled'
        w='124x'
        fontSize='md'
        fontWeight='bold'
        color='green.400'
        cursor='pointer'
        value={sortOption}
        onChange={handleSortOptionChange}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default SearchBar;
