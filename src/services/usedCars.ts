import { supabase } from './supabase';

export const getUsedCars = async () => {
  const { data } = await supabase.from('used_car').select();
  const sortedByName = data?.sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  return { usedCars: sortedByName || [] };
};

export const getUsedCarsByMonth = async (month: string) => {
  const { data, error } = await supabase.from('used_car').select();
  if (error) throw new Error('중고차 가격 기록을 불러오지 못했습니다.');
  const filteredByMonth = data
    ?.filter((item) => item.created_at.slice(0, 7) === month)
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  return { usedCars: filteredByMonth || [] };
};
