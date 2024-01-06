"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function Home() {
  const [gender, setGender] = useState("");
  const [diet, setDiet] = useState("");
  const [spicy, setSpicy] = useState("");
  const [allergies, setAllergies] = useState("");
  const [imageFile, setImage] = useState<any>();

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_API_KEY as string
  );

  async function getImageBase64(image: File) {
    const fr = new FileReader();
    fr.readAsDataURL(image);
    const promise = new Promise((resolve) => {
      fr.addEventListener("load", function (evt) {
        resolve({ data: evt.target?.result, type: image.type });
      });
    });
    return promise;
  }

  async function fileToGenerativePart() {
    const { data, type } = (await getImageBase64(imageFile)) as {
      data: string;
      type: string;
    };
    const srcBase64 = data.slice(data.indexOf(",") + 1);
    return {
      inlineData: {
        data: srcBase64,
        mimeType: type,
      },
    };
  }

  async function run() {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro-vision",
      generationConfig: {
        temperature: 1,
      },
    });

    const prompt = `
      I'm a ${gender}. I eat only ${diet} diet. I prefer ${spicy} spicy food. I am allergic to ${allergies}. Recommend some ${diet} dishes from the menu image provided. Remember my preferences. Do not recommend dish that may cause allergy.
    `;
    const imageParts = [await fileToGenerativePart()];
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = result.response;
    const text = response.text();
    console.log(text);
  }

  function handleSubmit() {
    run();
  }

  return (
    <main className="flex flex-col w-[50%] p-4 gap-5">
      <video id="video"></video>
      <input
        type="text"
        name="gender"
        placeholder="gender"
        onChange={(e) => {
          setGender(e.target.value);
        }}
      />
      <input
        type="text"
        name="diet"
        placeholder="Veg Or Non Veg"
        onChange={(e) => {
          setDiet(e.target.value);
        }}
      />
      <input
        type="text"
        name="spicy"
        placeholder="spiciness: Low or Extra"
        onChange={(e) => {
          setSpicy(e.target.value);
        }}
      />
      <input
        type="text"
        name="allergies"
        placeholder="do you have any allergies?"
        onChange={(e) => {
          setAllergies(e.target.value);
        }}
      />
      <input
        type="file"
        name="photo"
        accept=".jpg .png .jpeg"
        capture="user"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            const file = files[0];
            setImage(file);
          }
        }}
      />

      <button
        onClick={() => {
          navigator.mediaDevices
            .getUserMedia({
              audio: false,
              video: { width: 1280, height: 720 },
            })
            .then((stream) => {
              const video = document.querySelector("video");
              if (video) {
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                  video.play();
                };
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Camera
      </button>

      <button
        onClick={() => {
          const video = document.querySelector("video");
          if (video) {
            video.pause();
          }
        }}
      >
        pause
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Submit
      </button>
    </main>
  );
}
