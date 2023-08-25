import { Card, Checkbox, CheckboxGroup, Flex, Text } from '@chakra-ui/react';
import { FilterOption, FilterType } from '@/types/charger';
import useFilters from '@/hooks/useFilters';

const Filter = () => {
  const { setFilterOption } = useFilters();

  const handleFilterChange = (value: string[]) => {
    const filterKeys: FilterType[] = ['onlyAvailable', 'onlyFastCharger'];
    const option: FilterOption = { onlyAvailable: false, onlyFastCharger: false };

    filterKeys.forEach((key) => {
      option[key] = value.includes(key);
    });

    setFilterOption(option);
  };

  return (
    <Card className='filter' px={3}>
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
