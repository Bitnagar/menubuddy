"use client";
import createPreferences from "@/app/actions";
import LRingResizeWhite from "../loaders/LRingResizeWhite";
import { useFormStatus, useFormState } from "react-dom";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { PreferencesFormStateType } from "@/types/shared.types";

export default function PreferencesForm({ firstname }: { firstname: string }) {
  const initialState: PreferencesFormStateType = {
    success: null,
    error: null,
  };
  const [state, formAction] = useFormState(createPreferences, initialState);

  useEffect(() => {
    if (state.success) {
      redirect("/photo");
    }
  }, [state]);

  return (
    <div className="flex flex-col w-full xl:w-1/2 xl:self-center xl:m-auto min-h-[90%] items-center xl:items-start justify-center p-4 gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl">
          Save your dietary preferences, {firstname}!
        </h1>
        <p className="text-lg">
          We need these so as to recommend you a perfect dish from the menu.😋
        </p>
      </div>
      <div className="relative w-full h-fit flex flex-col items-center justify-center mt-2">
        <form
          className="w-full h-fit flex flex-col gap-8 [&>div>div>input]:cursor-pointer"
          action={formAction}
        >
          <div>
            <h1 className="font-semibold sm:text-lg xl:text-xl">
              What is your Gender?
            </h1>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="male"
              >
                Male
              </label>
              <input
                id="male"
                type="radio"
                name="gender"
                value={"male"}
                title="male"
                required
              />
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="female"
              >
                Female
              </label>
              <input
                id="female"
                title="female"
                type="radio"
                name="gender"
                value={"female"}
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold sm:text-lg xl:text-xl">
              Which diet do you prefer?
            </h1>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="vegetarian_without_eggs"
              >
                Vegetarian without eggs
              </label>
              <input
                id="vegetarian_without_eggs"
                title="vegetarian without eggs"
                type="radio"
                name="diet"
                value={"vegetarian without eggs"}
                required
              />
            </div>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="vegetarian_with_eggs"
              >
                Vegetarian with eggs
              </label>
              <input
                id="vegetarian_with_eggs"
                type="radio"
                name="diet"
                value={"vegetarian with eggs"}
                title="vegetarian with eggs"
              />
            </div>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="non_vegetarian"
              >
                Non-vegetarian
              </label>
              <input
                id="non_vegetarian"
                title="non-vegetarian"
                type="radio"
                name="diet"
                value={"non-vegetarian"}
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold sm:text-lg xl:text-xl">
              How much spice can you handle?
            </h1>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="low_spice"
              >
                Low Spicy
              </label>
              <input
                id="low_spice"
                type="radio"
                name="spice"
                value={"low"}
                title="low"
                required
              />
            </div>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="medium_spice"
              >
                Medium spicy
              </label>
              <input
                id="medium_spice"
                title="medium"
                type="radio"
                name="spice"
                value={"medium"}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="extra_spice"
              >
                Extra spicy
              </label>
              <input
                id="extra_spice"
                title="extra"
                type="radio"
                name="spice"
                value={"extra"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold sm:text-lg xl:text-xl">
              <h1>Do you have any allergies?</h1>
            </div>
            <textarea
              id="allergies"
              className="border w-full min-h-20 pl-1"
              placeholder="If you have any allergies, write them here. Else leave blank."
              wrap="false"
              name="allergies"
            ></textarea>
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={
        `p-2 rounded bg-black text-white flex items-center justify-center gap-2 mb-10 ` +
        `${pending ? `bg-gray-700` : `bg-black`}`
      }
      type="submit"
      disabled={pending}
    >
      {pending && <LRingResizeWhite />}
      {pending ? "Saving" : "Save and Continue -->"}
    </button>
  );
}
