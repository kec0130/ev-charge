import { supabase } from './supabase';

export const getUsedCars = async () => {
  const { data } = await supabase.from('used_car').select();
  const sortedByName = data?.sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  return { usedCars: sortedByName || [] };
};
