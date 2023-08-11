import useSWR from 'swr';

const CURRENT_DISTRICT_KEY = '/current-district-code';

const useDistrict = () => {
  const { data: districtCode, mutate } = useSWR<string>(CURRENT_DISTRICT_KEY);

  const setDistrictCode = (districtCode: string) => {
    mutate(districtCode);
  };

  const clearDistrictCode = () => {
    mutate('');
  };

  return {
    districtCode,
    setDistrictCode,
    clearDistrictCode,
  };
};

export default useDistrict;
