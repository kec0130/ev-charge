import { useAtom } from 'jotai';
import { Card, Checkbox, CheckboxGroup, Flex, Text, useTheme } from '@chakra-ui/react';

import { filterOptionAtom } from '@/states/map';
import { FilterOption, FilterType } from '@/types/map';

const Filter = () => {
  const [filterOption, setFilterOption] = useAtom(filterOptionAtom);
  const theme = useTheme();

  const handleFilterChange = (value: string[]) => {
    const filterKeys: FilterType[] = ['onlyPublic', 'onlyAvailable', 'onlyFastCharger'];
    const option: FilterOption = { ...filterOption };

    filterKeys.forEach((key) => {
      option[key] = value.includes(key);
    });

    setFilterOption(option);
  };

  return (
    <Card px={3} shadow={theme.shadows.onMap}>
      <CheckboxGroup
        colorScheme='green'
        size='sm'
        value={Object.keys(filterOption).filter((key) => filterOption[key as FilterType])}
        onChange={handleFilterChange}
      >
        <Flex alignItems='center' flexWrap='wrap' gap={3} minH={8} py={1}>
          <Text as='span' fontSize='sm' fontWeight='semibold'>
            필터
          </Text>
          <Checkbox value='onlyPublic'>제한 없는 곳</Checkbox>
          <Checkbox value='onlyAvailable'>충전가능</Checkbox>
          <Checkbox value='onlyFastCharger'>급속충전</Checkbox>
        </Flex>
      </CheckboxGroup>
    </Card>
  );
};

export default Filter;
