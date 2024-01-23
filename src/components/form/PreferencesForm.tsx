"use client";
import createPreferences from "@/app/actions";
import LRingResizeWhite from "../loaders/LRingResizeWhite";
import { useFormStatus } from "react-dom";

export default function PreferencesForm({ firstname }: any) {
  "use client";
  return (
    <div className="flex flex-col w-full xl:w-1/2 xl:self-center xl:m-auto min-h-[90%] items-center xl:items-start justify-center p-4 gap-4">
      <div>
        <h1 className="font-semibold text-2xl">
          Save your dietary preferences, {firstname}!
        </h1>
        <p className="text-base">
          We need these so as to recommend you a perfect dish from the menu.😋
        </p>
      </div>
      <div className="relative w-full h-fit flex flex-col items-center justify-center mt-5">
        <form
          className="w-full h-fit flex flex-col gap-8"
          action={createPreferences}
        >
          <div>
            <h1 className="font-semibold sm:text-lg xl:text-xl">
              What is your Gender?
            </h1>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="gender"
              >
                Male
              </label>
              <input
                id="gender"
                type="radio"
                name="gender"
                value={"male"}
                required
              />
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="gender"
              >
                Female
              </label>
              <input
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
                htmlFor="diet"
              >
                Vegetarian without eggs
              </label>
              <input
                type="radio"
                name="diet"
                value={"vegetarian without eggs"}
                required
              />
            </div>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="diet"
              >
                Vegetarian with eggs
              </label>
              <input
                id="diet"
                type="radio"
                name="diet"
                value={"vegetarian with eggs"}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="diet"
              >
                Non-vegetarian
              </label>
              <input
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
                htmlFor="spice"
              >
                Low Spicy
              </label>
              <input
                id="spice"
                type="radio"
                name="spice"
                value={"low"}
                required
              />
            </div>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="spice"
              >
                Medium spicy
              </label>
              <input
                type="radio"
                name="spice"
                value={"medium"}
              />
            </div>
            <div className="flex gap-3 items-center">
              <label
                className="sm:text-sm xl:text-base"
                htmlFor="spice"
              >
                Extra spicy
              </label>
              <input
                type="radio"
                name="spice"
                value={"extra"}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="font-semibold sm:text-lg xl:text-xl"
              htmlFor="allergies"
            >
              Do you have any allergies?
            </label>
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
      aria-disabled={pending}
    >
      {pending && <LRingResizeWhite />}
      {pending ? "Saving" : "Save and Continue -->"}
    </button>
  );
}
