import { useAtom } from 'jotai';
import { Card, Checkbox, CheckboxGroup, Flex, Text, useTheme } from '@chakra-ui/react';

import { filterOptionAtom } from '@/states/map';
import { FilterOption, FilterType } from '@/types/map';

const Filter = () => {
  const [filterOption, setFilterOption] = useAtom(filterOptionAtom);
  const theme = useTheme();

  const handleFilterChange = (value: string[]) => {
    const filterKeys: FilterType[] = ['onlyAvailable', 'onlyFastCharger'];
    const option: FilterOption = { ...filterOption };

    filterKeys.forEach((key) => {
      option[key] = value.includes(key);
    });

    setFilterOption(option);
  };

  return (
    <Card px={3} shadow={theme.shadows.onMap}>
      <CheckboxGroup colorScheme='green' size='sm' onChange={handleFilterChange}>
        <Flex alignItems='center' gap={3} h={8}>
          <Text as='span' fontSize='sm' fontWeight='semibold'>
            필터
          </Text>
          <Checkbox value='onlyAvailable'>사용가능</Checkbox>
          <Checkbox value='onlyFastCharger'>급속충전</Checkbox>
        </Flex>
      </CheckboxGroup>
    </Card>
  );
};

export default Filter;
