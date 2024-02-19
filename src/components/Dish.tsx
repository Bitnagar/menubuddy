/* eslint-disable @next/next/no-img-element */
"use client";

import { useLayoutEffect, useState } from "react";
import { generateDish } from "@/app/actions";
import { getImageBase64 } from "@/helpers/client";
import LRingResize from "./loaders/LRingResizeWhite";
import OutputDrawer from "./OutputDrawer";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { GetDishFormStateType } from "@/types/shared.types";

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

  const initialState: GetDishFormStateType = {
    success: null,
    error: null,
  };

  const [state, formAction] = useFormState(generateDish, initialState);

  async function parseImageFile(file: File) {
    const image = await getImageBase64(file);
    setParsedImage(image);
  }

  useLayoutEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      document.getElementById("drawer")?.click();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="w-full h-full flex flex-col 2xl:flex-row items-center justify-evenly gap-10 2xl:gap-20"
    >
      {!parsedImageObject.data && (
        <div className="flex flex-col items-center justify-center gap-10">
          <button
            type="button"
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
            <a
              href="/preferences"
              className="font-normal text-sm underline"
            >
              Edit preferences
            </a>
          </div>
        </div>
      )}
      {parsedImageObject.data && (
        <>
          {!parsedImageObject.data && (
            <p className="mt-[15rem]">Loading image...</p>
          )}
          {parsedImageObject.data && (
            <div className="w-80 md:w-96 xl:w-[40%] mt-16 2xl:mt-0 drop-shadow-2xl">
              <img
                src={parsedImageObject.data}
                alt="photo of a menu"
                className="w-fit self-center rounded-md"
              />
            </div>
          )}
          <div className="flex flex-col items-center justify-center mb-[6rem] 2xl:mb-0 drop-shadow-2xl">
            <div className="flex 2xl:flex-col 2xl:w-full items-center justify-center gap-4 mb-5">
              <SubmitButton />
              <RetakeButton />
            </div>
            <a
              href="/preferences"
              className="font-normal text-sm underline"
            >
              Edit preferences
            </a>
          </div>
          {<OutputDrawer text={state.success} />}
        </>
      )}
      <input
        title="file"
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
        type="hidden"
        name="user_base64_menu_img"
        className="hidden"
        defaultValue={parsedImageObject.data}
      />
      <input
        type="hidden"
        name="user_base64_menu_img_type"
        className="hidden"
        defaultValue={parsedImageObject.type}
      />
      <input
        type="hidden"
        name="diet"
        defaultValue={preferences[0].diet}
        className="hidden"
      />
      <input
        type="hidden"
        name="gender"
        defaultValue={preferences[0].gender}
        className="hidden"
      />
      <input
        type="hidden"
        name="spiciness"
        defaultValue={preferences[0].spiciness}
        className="hidden"
      />
      <input
        type="hidden"
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
      disabled={pending}
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
