/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

let gender = "male",
  diet = "vegetarian",
  spiciness = "low",
  allergies = "Mushrooms and pickle";

export default function Home() {
  const [rawImage, setRawImage] = useState<File>();
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

  async function run() {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro-vision",
      generationConfig: {
        temperature: 0.85,
      },
    });

    const prompt = `
      I am a ${gender} who follows a ${diet} diet. ${
      diet === "vegetarian" ? "I don't eat eggs." : "I can eat eggs."
    } I prefer ${spiciness} spicy food, but I am allergic to ${allergies}. Can you recommend some ${diet}-friendly dishes from the restaurant menu photo that I provided? Please make sure the recommendations won't trigger any allergic reactions for me. Give output in the following format, just name the dishes with a sentence like:

    You can eat the following dishes from the menu:
    - <dish name>
    `;

    const imageParts = [await fileToGenerativePart()];
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = result.response;
    const text = response.text();
    setText(text);
    console.log(typeof text);
  }

  function handleSubmit() {
    run();
  }

  async function parseImageFile(file: File) {
    setRawImage(file);
    const image = await getImageBase64(file);
    setImageData({ data: image.data, type: image.type });
  }

  async function getImageBase64(image: File): Promise<any> {
    const fr = new FileReader();
    fr.readAsDataURL(image);
    const promise = new Promise((resolve, reject) => {
      fr.addEventListener("load", function (evt) {
        if (evt.target) {
          resolve({ data: evt.target.result, type: image.type });
        } else reject("Failed to read the image.");
      });
    });
    return promise;
  }

  return (
    <main className="w-full h-[90%] flex items-center justify-center p-4">
      <div className="text-center h-1/2 flex flex-col gap-10 justify-center">
        {!rawImage && (
          <>
            <div className="h-1/2 flex flex-col justify-evenly">
              <h2 className="font-bold text-xl">
                You can take a photo of the restaurant menu.
              </h2>
              <h2 className="font-bold">OR</h2>
              <h2 className="font-bold text-xl">
                You can choose a photo from your files
              </h2>
              <h2 className="font-normal text-sm">
                (*mobile users make sure browser has camera permissions
                enabled.)
              </h2>
            </div>
            <div className="flex gap-2 self-center">
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
            </div>
          </>
        )}
        {rawImage && (
          <>
            <div className="flex flex-col gap-10 self-center items-center">
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
              <div className="flex gap-4">
                <button
                  id="import-dialog"
                  className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center"
                  onClick={handleSubmit}
                >
                  Recommend a dish
                </button>
                <button
                  id="import-dialog"
                  className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center"
                  onClick={() => {
                    document.getElementById("file")?.click();
                  }}
                >
                  Choose another photo
                </button>
              </div>
              <pre className="text-sm font-medium w-fit text-left">{text}</pre>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
