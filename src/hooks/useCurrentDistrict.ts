import useSWR from 'swr';

const CURRENT_DISTRICT_KEY = '/current-district-code';

const useCurrentDistrict = () => {
  const { data = '', mutate } = useSWR<string>(CURRENT_DISTRICT_KEY);

  const setCurrentDistrict = (districtCode: string) => {
    mutate(districtCode);
  };

  const clearCurrentDistrict = () => {
    mutate('');
  };

  return {
    currentDistrict: data,
    setCurrentDistrict,
    clearCurrentDistrict,
  };
};

export default useCurrentDistrict;
