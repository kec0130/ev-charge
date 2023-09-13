import { supabase } from './supabase';

export const getUsedCars = async () => {
  const { data } = await supabase.from('used_car').select();

  return { usedCars: data || [] };
};
