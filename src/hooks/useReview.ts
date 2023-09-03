import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

interface ReviewParams {
  stationId: string;
  rating: number;
  content: string;
}

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

const useReview = () => {
  const getReviews = async (stationId: string) => {
    const { data, error } = await supabase
      .from('charge-station-reviews')
      .select()
      .eq('station_id', stationId)
      .order('id', { ascending: false });

    return { data, error };
  };

  const postReview = async ({ stationId, rating, content }: ReviewParams) => {
    const { error } = await supabase
      .from('charge-station-reviews')
      .insert({ station_id: stationId, rating, content });

    return error;
  };

  return {
    getReviews,
    postReview,
  };
};

export default useReview;
