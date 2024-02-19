import supabase from "@/utils/supabase";
import { reduceApiCallCount } from "@/lib/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

type GenerateDishRawFormDataType = {
  image: string;
  userBase64Image: string;
  userBase64ImageType: string;
  diet: string;
  gender: string;
  spiciness: string;
  allergies: string;
};

export const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);

export async function fileToGenerativePart(
  rawFormData: GenerateDishRawFormDataType
) {
  try {
    const srcBase64 = rawFormData.userBase64Image.slice(
      rawFormData.userBase64Image.indexOf(",") + 1
    );
    return {
      inlineData: {
        data: srcBase64,
        mimeType: rawFormData.userBase64ImageType,
      },
    };
  } catch (error: any) {
    return {
      inlineData: {
        data: "",
        mimeType: "",
      },
    };
  }
}

export function createPrompt(rawFormData: GenerateDishRawFormDataType): string {
  return `
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
}

export async function getDish(
  currentClerkUserId: string,
  rawFormData: GenerateDishRawFormDataType,
  prompt: string
) {
  const { data } = await supabase
    .from("user")
    .select("rate_limit")
    .eq("clerk_id", currentClerkUserId);

  if (data && data.length > 0) {
    let currentApiCallsCount = data[0].rate_limit;
    if (currentApiCallsCount && currentApiCallsCount > 0) {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro-vision",
        generationConfig: {
          temperature: 0.85,
        },
      });

      const imageParts = [await fileToGenerativePart(rawFormData)];
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = result.response;
      const text = response.text();
      reduceApiCallCount(currentApiCallsCount, currentClerkUserId);
      return {
        success: text,
        error: null,
      };
    } else {
      return {
        success: null,
        error:
          "You have exhausted all your API credits. Contact the project creator.",
      };
    }
  }
  return { success: null, error: "User Data Not Found" };
}
