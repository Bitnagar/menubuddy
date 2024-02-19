"use server";

import supabase from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs";
import { createPrompt, getDish } from "@/helpers/gemini";
import {
  GetDishFormStateType,
  PreferencesFormStateType,
} from "@/types/shared.types";

export default async function createPreferences(
  prevState: PreferencesFormStateType,
  formData: FormData
) {
  const currentClerkUser = await currentUser();

  const rawFormData = {
    gender: formData.get("gender"),
    diet: formData.get("diet"),
    spice: formData.get("spice"),
    allergies: formData.get("allergies"),
  };

  const { data, error } = await supabase
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
    return { success: "Form saved", error: null };
  } else {
    return { success: null, error: error?.hint };
  }
}

export async function generateDish(
  prevState: GetDishFormStateType,
  formData: FormData | any
) {
  const currentClerkUser = await currentUser();

  if (!currentClerkUser)
    return {
      success: null,
      error: "No user found in session.",
    };

  const rawFormData = {
    image: formData.get("user_upload_menu_img"),
    userBase64Image: formData.get("user_base64_menu_img"),
    userBase64ImageType: formData.get("user_base64_menu_img_type"),
    diet: formData.get("diet"),
    gender: formData.get("gender"),
    spiciness: formData.get("spiciness"),
    allergies: formData.get("allergies"),
  };

  const prompt = createPrompt(rawFormData);
  const response = await getDish(currentClerkUser.id, rawFormData, prompt);
  return response;
}
