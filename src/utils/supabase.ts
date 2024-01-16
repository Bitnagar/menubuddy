import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

export default createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
