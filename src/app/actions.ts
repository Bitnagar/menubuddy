"use server";

import supabase from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { redirect } from "next/navigation";

export default async function createPreferences(formData: FormData) {
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
    redirect("/photo");
  } else {
    return error?.hint;
  }
}

export async function generateDish(
  prevState: void | null | any,
  formData: FormData | any
) {
  const currentClerkUser = await currentUser();

  const rawFormData = {
    image: formData.get("user_upload_menu_img"),
    user_base64_menu_img: formData.get("user_base64_menu_img"),
    user_base64_menu_img_type: formData.get("user_base64_menu_img_type"),
    diet: formData.get("diet"),
    gender: formData.get("gender"),
    spiciness: formData.get("spiciness"),
    allergies: formData.get("allergies"),
  };

  async function fileToGenerativePart() {
    try {
      const srcBase64 = rawFormData.user_base64_menu_img.slice(
        rawFormData.user_base64_menu_img.indexOf(",") + 1
      );
      return {
        inlineData: {
          data: srcBase64,
          mimeType: rawFormData.user_base64_menu_img_type,
        },
      };
    } catch (error: any) {
      alert(error.message);
      return {
        inlineData: {
          data: "",
          mimeType: "",
        },
      };
    }
  }

  const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);

  async function reduceApiCallCount(currentRateLimit: any, userId: string) {
    await supabase
      .from("user")
      .update({
        rate_limit: currentRateLimit - 1,
        updated_at: `${new Date().toISOString()}`,
      })
      .eq("clerk_id", userId)
      .select();
  }

  async function run() {
    // fetch userData
    const { data } = await supabase
      .from("user")
      .select("rate_limit")
      .eq("clerk_id", currentClerkUser?.id);

    if (data && data.length > 0) {
      let currentApiCallsCount = data[0].rate_limit;
      if (currentApiCallsCount && currentApiCallsCount > 0) {
        const model = genAI.getGenerativeModel({
          model: "gemini-pro-vision",
          generationConfig: {
            temperature: 0.85,
          },
        });

        const prompt = `
      I am a ${rawFormData.gender} who follows a ${
          rawFormData.diet
        } diet. I prefer ${rawFormData.spiciness} spicy food. ${
          rawFormData.allergies ? `${rawFormData.allergies}.` : ""
        }Can you recommend some ${
          rawFormData.diet
        }-friendly dishes from the restaurant menu photo that I provided? Please make sure the recommendations won't trigger any allergic reactions for me. Give output in the following format, just name the dishes with a sentence like:

    You can eat the following dishes from the menu:
    - <dish name>: <dish-summary or ingredients>

    If you don't find any dish according to my preferences, then don't recommend any dish, just say you couldn't find a dish from the menu.
    `;

        const imageParts = [await fileToGenerativePart()];
        const result = await model.generateContent([prompt, ...imageParts]);
        const response = result.response;
        const text = response.text();
        reduceApiCallCount(currentApiCallsCount, currentClerkUser?.id!);
        return {
          message: text,
        };
      } else {
        return {
          error:
            "You have exhausted all your API credits. Contact the project creator.",
        };
      }
    }
    return { error: "User Data Not Found" };
  }

  const textObject = await run();
  return textObject;
}
