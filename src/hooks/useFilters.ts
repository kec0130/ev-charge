import useSWR from 'swr';
import { FilterOption } from '@/types/charger';

const FILTER_OPTION_KEY = '/filter-option';

const DEFAULT_FILTER_OPTION: FilterOption = {
  onlyAvailable: false,
  onlyFastCharger: false,
};

const useFilters = () => {
  const { data = DEFAULT_FILTER_OPTION, mutate } = useSWR<FilterOption>(FILTER_OPTION_KEY);

  const setFilterOption = (option: FilterOption) => {
    mutate(option);
  };

  const resetFilterOption = () => {
    mutate(DEFAULT_FILTER_OPTION);
  };

  return {
    filterOption: data,
    setFilterOption,
    resetFilterOption,
  };
};

export default useFilters;
