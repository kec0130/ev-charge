export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
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
          created_at: string;
          id: number;
          image: string | null;
          max_price: number;
          min_price: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image?: string | null;
          max_price: number;
          min_price: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          image?: string | null;
          max_price?: number;
          min_price?: number;
          name?: string;
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
export type UsedCar = Tables<'used_car'>;
