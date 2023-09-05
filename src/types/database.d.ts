export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      'charge-station-reviews': {
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

export type Review = Tables<'charge-station-reviews'>;
