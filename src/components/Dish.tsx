/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { generateDish } from "@/app/actions";
import { getImageBase64 } from "@/utils/utils";
import LRingResize from "./loaders/LRingResizeWhite";
import OutputDrawer from "./OutputDrawer";
import { useFormState, useFormStatus } from "react-dom";

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
  const [parsedImageObject, setParsedImage] = useState({
    data: "",
    type: "",
  });

  const [state, formAction] = useFormState(generateDish, null);

  useEffect(() => {
    document.getElementById("drawer")?.click();
  }, [state]);

  async function parseImageFile(file: File) {
    const image = await getImageBase64(file);
    setParsedImage(image);
  }

  return (
    <form
      action={formAction}
      className="flex flex-col"
    >
      {!parsedImageObject.data && (
        <div className="flex flex-col items-center justify-center gap-10">
          <button
            onClick={(e) => {
              e.preventDefault();
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
          <div className="text-center">
            <p className="font-medium text-xl xl:text-2xl">
              Click or select a picture of the menu.
            </p>
            <p className="text-sm text-gray-500 mt-2 xl:text-lg">
              (*enable camera permission for browser)
            </p>
          </div>
        </div>
      )}
      {parsedImageObject.data && (
        <>
          {!parsedImageObject.data && (
            <p className="mt-[15rem]">Loading image...</p>
          )}
          {parsedImageObject.data && (
            <>
              <img
                src={parsedImageObject.data}
                alt="photo of a menu"
                className="self-center sm:w-80 md:w-96 lg:w-[450px] 2xl:w-5/12 rounded-md my-16"
              />
            </>
          )}
          <div className="flex flex-col items-center justify-center mb-[6rem]">
            <div className="flex items-center justify-center gap-4">
              <SubmitButton />
              <RetakeButton />
            </div>
          </div>
          {<OutputDrawer text={state} />}
        </>
      )}
      <input
        id="file"
        type="file"
        name="filelist_raw_data_img"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          e.preventDefault();
          const files = e.target.files;
          if (files && files.length > 0) {
            const file = files[0];
            parseImageFile(file);
          }
        }}
      />
      <input
        type="text"
        name="user_base64_menu_img"
        className="hidden"
        defaultValue={parsedImageObject.data}
      />
      <input
        type="text"
        name="user_base64_menu_img_type"
        className="hidden"
        defaultValue={parsedImageObject.type}
      />
      <input
        type="text"
        name="diet"
        defaultValue={preferences[0].diet}
        className="hidden"
      />
      <input
        type="text"
        name="gender"
        defaultValue={preferences[0].gender}
        className="hidden"
      />
      <input
        type="text"
        name="spiciness"
        defaultValue={preferences[0].spiciness}
        className="hidden"
      />
      <input
        type="text"
        name="allergies"
        defaultValue={preferences[0].allergies}
        className="hidden"
      />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-fit 2xl:w-44 flex justify-center items-center gap-2 bg-primary-purple hover:bg-hover-purple active:bg-primary-purple transition text-white shadow-button font-semibold p-2 rounded-md self-center"
      // disabled={isLoading}
    >
      {pending && <LRingResize />}
      {pending ? "Please wait..." : "Get a dish 🍝"}
    </button>
  );
}

function RetakeButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="button"
      id="import-dialog"
      className="w-fit 2xl:w-44 flex items-center justify-center gap-2 bg-black text-white shadow button font-semibold p-2 rounded-md self-center"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("file")?.click();
      }}
      disabled={pending}
    >
      <img
        src={"/assets/camera.svg"}
        alt="dish icon"
        width={20}
        height={20}
      />
      Retake photo
    </button>
  );
}
