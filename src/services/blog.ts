import { supabase } from './supabase';

export const getAllPosts = async () => {
  const { data } = await supabase.from('post').select();

  return { posts: data || [] };
};

export const getPost = async (slug: string) => {
  const { data } = await supabase.from('post').select().eq('slug', slug).single();

  return { post: data };
};
