/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getImageBase64 } from "@/utils/utils";
import supabase from "@/utils/supabase";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import LRingResize from "./loaders/LRingResizeWhite";
import OutputDrawer from "./OutputDrawer";

export default function Dish({
  preferences,
}: {
  preferences: [
    {
      gender: string;
      diet: string;
      spiciness: string;
      allergies: string;
    }
  ];
}) {
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

  async function reduceRateLimit(currentRateLimit: any, userId: string) {
    const { data, error } = await supabase
      .from("user")
      .update({
        rate_limit: currentRateLimit - 1,
        updated_at: `${new Date().toISOString()}`,
      })
      .eq("clerk_id", userId)
      .select();

    if (data && error === null) {
      let updatedLimit = data[0].rate_limit;
      console.warn("updated rate limit: ", updatedLimit);
      toast.success(updatedLimit + " request(s) remaining.");
    } else if (error !== null) {
      toast.error(error.hint);
    }
  }

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
      if (currentRateLimit && currentRateLimit > 0) {
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
        document.getElementById("drawer")?.click();
        setIsLoading(false);
        reduceRateLimit(currentRateLimit, user?.id!);
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
    <>
      {!rawImage && (
        <div className="flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => {
              document.getElementById("file")?.click();
            }}
            className="w-[90px] h-[90px] flex items-center justify-center rounded-xl bg-custom-addFileWhite shadow-button"
          >
            <img
              src={"assets/images.svg"}
              alt="add photo"
              width={25}
              height={25}
            />
          </button>
          <input
            id="file"
            type="file"
            name="photo"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                const file = files[0];
                parseImageFile(file);
              }
            }}
          />
          <div className="h-fit text-center">
            <p className="font-medium text-xl xl:text-2xl">
              Click or select a picture of the menu.
            </p>
            <p className="text-sm text-gray-500 mt-2 xl:text-lg">
              (*enable camera permission for browser)
            </p>
            <a
              href="/preferences"
              className="font-normal text-sm underline"
            >
              Edit preferences
            </a>
          </div>
        </div>
      )}
      {rawImage && (
        <>
          {!imageData.data && <p className="mt-[15rem]">Loading image...</p>}
          {imageData.data && (
            <>
              <img
                src={imageData.data}
                alt="photo of a menu"
                className="self-center sm:w-80 md:w-96 lg:w-[450px] 2xl:w-5/12 rounded-md mt-[6rem]"
              />
            </>
          )}
          <input
            type="file"
            name="photo"
            style={{ display: "none" }}
            accept="image/*"
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
          <div className="flex flex-col items-center justify-center mb-[6rem]">
            <div className="flex items-center justify-center gap-4">
              <button
                id="import-dialog"
                className="w-fit 2xl:w-44 flex justify-center items-center gap-2 bg-primary-purple hover:bg-hover-purple active:bg-primary-purple transition text-white shadow-button font-semibold p-2 rounded-md self-center"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading && <LRingResize />}
                {isLoading ? "Please wait..." : "Get a dish 🍝"}
              </button>
              <button
                id="import-dialog"
                className="w-fit 2xl:w-44 flex items-center justify-center gap-2 bg-black text-white shadow button font-semibold p-2 rounded-md self-center"
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
          <OutputDrawer text={text} />
        </>
      )}
    </>
  );
}
