export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      post: {
        Row: {
          created_at: string;
          description: string;
          id: number;
          image_url: string;
          keywords: string;
          slug: string;
          title: string;
        };
        Insert: {
          created_at: string;
          description: string;
          id?: number;
          image_url: string;
          keywords: string;
          slug: string;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          image_url?: string;
          keywords?: string;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      station_review: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          rating: number;
          station_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: number;
          rating: number;
          station_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          rating?: number;
          station_id?: string;
        };
        Relationships: [];
      };
      used_car: {
        Row: {
          created_at: string | null;
          id: number;
          max_price: number | null;
          min_price: number | null;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          max_price?: number | null;
          min_price?: number | null;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          max_price?: number | null;
          min_price?: number | null;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type Review = Tables<'station_review'>;
export type Post = Tables<'post'>;
export type UsedCar = Tables<'used_car'>;
