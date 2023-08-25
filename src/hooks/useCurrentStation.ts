import useSWR from 'swr';

const CURRENT_STATION_KEY = '/current-station';

const useCurrentStation = () => {
  const { data = '', mutate } = useSWR<string>(CURRENT_STATION_KEY);

  const setCurrentStation = (stationId: string) => {
    mutate(stationId);
  };

  const clearCurrentStation = () => {
    mutate('');
  };

  return {
    currentStation: data,
    setCurrentStation,
    clearCurrentStation,
  };
};

export default useCurrentStation;
