import useSWR from 'swr';

const CURRENT_DISTRICT_KEY = '/current-district-code';

const useDistrict = () => {
  const { data: districtCode, mutate } = useSWR<string>(CURRENT_DISTRICT_KEY);

  const setDistrictCode = (districtCode: string) => {
    mutate(districtCode);
  };

  return {
    districtCode,
    setDistrictCode,
  };
};

export default useDistrict;
