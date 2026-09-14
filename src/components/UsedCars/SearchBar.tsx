import type { ChangeEventHandler, MouseEventHandler } from 'react';
import Icon from '../Common/Icon';
export default function SearchBar({
  inputValue,
  handleInputChange,
  handleClearButtonClick,
}: {
  inputValue: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleClearButtonClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className='search-field'>
      <Icon name='search' />
      <input
        type='search'
        aria-label='차종 검색'
        placeholder='차종명을 검색하세요'
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && (
        <button aria-label='검색어 지우기' onClick={handleClearButtonClick}>
          <Icon name='close' size={16} />
        </button>
      )}
    </div>
  );
}
