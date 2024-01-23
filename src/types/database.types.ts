export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user: {
        Row: {
          allergies: string;
          clerk_id: string;
          created_at: string;
          diet: string;
          gender: string;
          id: string;
          rate_limit: number;
          spiciness: string;
          updated_at: string;
        };
        Insert: {
          allergies?: string;
          clerk_id: string;
          created_at?: string;
          diet: string;
          gender: string;
          id?: string;
          rate_limit?: number;
          spiciness: string;
          updated_at?: string;
        };
        Update: {
          allergies?: string;
          clerk_id?: string;
          created_at?: string;
          diet?: string;
          gender?: string;
          id?: string;
          rate_limit?: number;
          spiciness?: string;
          updated_at?: string;
        };
      };
    };
  };
}
