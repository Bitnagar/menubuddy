import supabase from "@/utils/supabase";
import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Dish from "@/components/Dish";

export default async function Page() {
  const { userId } = auth();

  if (userId) {
    let { data }: { data: any } = await supabase
      .from("user")
      .select("*")
      .eq("clerk_id", userId)
      .select();

    if (data && data.length === 0) {
      redirect("/preferences");
    } else {
      return (
        <section className="w-full min-h-min flex flex-col justify-center items-center gap-6 p-4">
          <Dish preferences={data} />
        </section>
      );
    }
  }
}
