import { supabase } from './supabase';

interface NewReview {
  stationId: string;
  rating: number;
  content: string;
}

export const getReviews = async (stationId: string) => {
  const { data } = await supabase
    .from('station_review')
    .select()
    .eq('station_id', stationId)
    .order('id', { ascending: false });

  return { data: data || [] };
};

export const postReview = async ({ stationId, rating, content }: NewReview) => {
  const { error } = await supabase
    .from('station_review')
    .insert({ station_id: stationId, rating, content });

  const { data } = await getReviews(stationId);

  return { data, error };
};
