import useSWR from 'swr';

const CURRENT_STATION_KEY = '/current-station';

const useStation = () => {
  const { data: stationId, mutate } = useSWR<string>(CURRENT_STATION_KEY);

  const setStationId = (stationId: string) => {
    mutate(stationId);
  };

  const clearStationId = () => {
    mutate('');
  };

  return {
    stationId,
    setStationId,
    clearStationId,
  };
};

export default useStation;
