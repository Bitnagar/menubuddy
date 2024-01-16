"use server";

import supabase from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function createPreferences(formData: FormData) {
  const currentClerkUser = await currentUser();

  const rawFormData = {
    gender: formData.get("gender"),
    diet: formData.get("diet"),
    spice: formData.get("spice"),
    allergies: formData.get("allergies"),
  };

  const { data } = await supabase
    .from("user")
    .upsert(
      {
        clerk_id: currentClerkUser?.id,
        created_at: `${new Date().toISOString()}`,
        updated_at: `${new Date().toISOString()}`,
        gender: rawFormData.gender,
        diet: rawFormData.diet,
        spiciness: rawFormData.spice,
        allergies: rawFormData.allergies,
      },
      { onConflict: "clerk_id" }
    )
    .select();

  if (data && data.length > 0) {
    redirect("/photo");
  } else {
    redirect("/preferences");
  }
}
