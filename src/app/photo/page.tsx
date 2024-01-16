import supabase from "@/utils/supabase";
import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Dish from "@/components/Dish";

export default async function Page() {
  const { userId } = auth();

  if (userId) {
    let { data } = await supabase
      .from("user")
      .select("*")
      .eq("clerk_id", userId);

    if (data && data.length === 0) {
      redirect("/preferences");
    } else {
      return (
        <div className="min-h-[90%] flex items-center justify-center">
          <Dish preferences={data} />
        </div>
      );
    }
  }
}
