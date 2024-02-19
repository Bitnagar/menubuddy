import supabase from "@/utils/supabase";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function reduceApiCallCount(
  currentRateLimit: number,
  userId: string
) {
  await supabase
    .from("user")
    .update({
      rate_limit: currentRateLimit - 1,
      updated_at: `${new Date().toISOString()}`,
    })
    .eq("clerk_id", userId)
    .select();
}
