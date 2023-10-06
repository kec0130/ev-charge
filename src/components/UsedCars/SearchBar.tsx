import { ChangeEventHandler, MouseEventHandler } from 'react';
import {
  CloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useTheme,
} from '@chakra-ui/react';

import { SearchIcon } from '../../../public/icons';

interface Props {
  inputValue: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleClearButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const SearchBar = ({ inputValue, handleInputChange, handleClearButtonClick }: Props) => {
  const theme = useTheme();

  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon style={{ fill: theme.colors.gray[500] }} />
      </InputLeftElement>
      <Input placeholder='모델명을 입력하세요.' value={inputValue} onChange={handleInputChange} />
      <InputRightElement>
        <CloseButton rounded='full' size='sm' color='gray.500' onClick={handleClearButtonClick} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
