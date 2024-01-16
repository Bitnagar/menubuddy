/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getImageBase64 } from "@/utils/utils";
import supabase from "@/utils/supabase";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import LRingResize from "./loaders/LRingResizeWhite";

export default function Dish({ preferences }: any) {
  const { user } = useUser();
  const [rawImage, setRawImage] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<{ data: string; type: string }>({
    data: "",
    type: "",
  });

  const [text, setText] = useState("");

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_API_KEY as string
  );

  async function fileToGenerativePart() {
    try {
      const srcBase64 = imageData.data.slice(imageData.data.indexOf(",") + 1);
      return {
        inlineData: {
          data: srcBase64,
          mimeType: imageData.type,
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

  // async function reduceRateLimit(userId: string) {
  //   // fetch current rate limit value
  //   const { data } = await supabase
  //     .from("user")
  //     .select("rate_limit")
  //     .eq("clerk_id", userId);

  //   if (data && data.length > 0) {
  //     let currentRateLimit = data[0].rate_limit;
  //     console.log("current rate limit: ", currentRateLimit);

  //     const { data: updated_rate_limit_data } = await supabase
  //       .from("user")
  //       .update({
  //         rate_limit: currentRateLimit - 1,
  //         updated_at: `${new Date().toLocaleString()}`,
  //       })
  //       .eq("clerk_id", userId)
  //       .select();

  //     if (updated_rate_limit_data) {
  //       let updated_rate_limit = updated_rate_limit_data[0].rate_limit;
  //       console.log("updated rate limit: ", currentRateLimit);
  //       toast.success(updated_rate_limit + " request(s) remaining.");
  //     }
  //   }
  // }

  async function run() {
    setIsLoading(true);
    // fetch userData
    const { data } = await supabase
      .from("user")
      .select("rate_limit")
      .eq("clerk_id", user?.id!);

    if (data && data.length > 0) {
      let currentRateLimit = data[0].rate_limit;
      console.log("current rate limit: ", currentRateLimit);
      if (currentRateLimit > 0) {
        const model = genAI.getGenerativeModel({
          model: "gemini-pro-vision",
          generationConfig: {
            temperature: 0.85,
          },
        });

        const prompt = `
      I am a ${preferences[0].gender} who follows a ${
          preferences[0].diet
        } diet. I prefer ${preferences[0].spiciness} spicy food. ${
          preferences[0].allergies ? `${preferences[0].allergies}.` : ""
        }Can you recommend some ${
          preferences[0].diet
        }-friendly dishes from the restaurant menu photo that I provided? Please make sure the recommendations won't trigger any allergic reactions for me. Give output in the following format, just name the dishes with a sentence like:

    You can eat the following dishes from the menu:
    - <dish name>: <dish-summary or ingredients>

    If you don't find any dish according to my preferences, then don't recommend any dish, just say you couldn't find a dish from the menu.
    `;

        const imageParts = [await fileToGenerativePart()];
        const result = await model.generateContent([prompt, ...imageParts]);
        const response = result.response;
        const text = response.text();
        setText(text);
        setIsLoading(false);
        // reduceRateLimit(user?.id!);
        const { data, error } = await supabase
          .from("user")
          .update({
            rate_limit: currentRateLimit - 1,
            updated_at: `${new Date().toISOString()}`,
          })
          .eq("clerk_id", user?.id)
          .select();

        if (data && error === null) {
          let updatedLimit = data[0].rate_limit;
          console.log("updated rate limit: ", updatedLimit);
          toast.success(updatedLimit + " request(s) remaining.");
        } else if (error !== null) {
          toast.error(error.hint);
        }
      } else {
        console.error("You have exhausted your API RATE LIMIT.");
        console.log("Current RATE LIMIT: " + currentRateLimit);
        toast.error("You have exhausted your API RATE LIMIT.");
        setIsLoading(false);
      }
    }
  }

  async function parseImageFile(file: File) {
    setRawImage(file);
    const image = await getImageBase64(file);
    setImageData({ data: image.data, type: image.type });
  }

  function handleSubmit() {
    run();
  }

  return (
    <main className="w-full h-full flex items-center justify-center p-6">
      <div className="text-center flex flex-col gap-10 justify-center">
        {!rawImage && (
          <>
            <div className="flex flex-col justify-evenly">
              <h2 className="font-bold text-xl">
                You can take a photo of the restaurant menu.
              </h2>
              <h2 className="font-bold">OR</h2>
              <h2 className="font-bold text-xl">
                You can choose a photo from your files
              </h2>
              <h2 className="font-normal text-sm">
                (Enable camera access for browser)
              </h2>
            </div>
            <div className="flex flex-col gap-2 self-center">
              <input
                type="file"
                name="photo"
                accept=".jpg, .jpeg, .png"
                capture="user"
                className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    parseImageFile(file);
                  }
                }}
              />
              <a
                href="/preferences"
                className="font-normal text-sm underline mt-4"
              >
                Edit preferences
              </a>
            </div>
          </>
        )}
        {rawImage && (
          <>
            <div className="w-fit flex flex-col gap-10 self-center items-center">
              {!imageData.data && <p>Loading image...</p>}
              {imageData.data && (
                <img
                  src={imageData.data}
                  alt="photo of a menu"
                  width={300}
                  height={150}
                  className="self-center"
                />
              )}
              <input
                type="file"
                name="photo"
                style={{ display: "none" }}
                accept=".jpg, .jpeg, .png"
                capture="user"
                id="file"
                className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    parseImageFile(file);
                  }
                }}
              />
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-4">
                  <button
                    id="import-dialog"
                    className="w-fit flex items-center gap-2 bg-pink-700 text-white font-semibold p-2 rounded-md self-center"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {!isLoading && (
                      <img
                        src={"/assets/dish-icon.svg"}
                        alt="dish icon"
                        width={20}
                        height={20}
                      />
                    )}
                    {isLoading && <LRingResize />}
                    {isLoading ? "Please wait..." : "Get a dish"}
                  </button>
                  <button
                    id="import-dialog"
                    className="w-fit flex items-center gap-2 bg-black text-white font-semibold p-2 rounded-md self-center"
                    onClick={() => {
                      document.getElementById("file")?.click();
                    }}
                    disabled={isLoading}
                  >
                    <img
                      src={"/assets/camera.svg"}
                      alt="dish icon"
                      width={20}
                      height={20}
                    />
                    Retake photo
                  </button>
                </div>
                <a
                  href="/preferences"
                  className="block font-normal text-sm underline mt-4"
                >
                  Edit preferences
                </a>
              </div>
              <pre className="text-sm font-medium text-left text-wrap">
                {text}
              </pre>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
