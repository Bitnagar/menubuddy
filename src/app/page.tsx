/* eslint-disable react/no-unescaped-entities */
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

export default async function Home() {
  return (
    <>
      <section className="bg-radial-gradient-purple w-full min-h-screen flex flex-col gap-10 justify-center text-center p-4">
        <div className="flex flex-col gap-10 sm:mb-16 xl:mb-10">
          <h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl">
            84% of Gen Z’s suffer from menu anxiety.
          </h1>
          <h2 className="font-medium text-xl xl:text-2xl">
            MenuBuddy AI is here to help them.
          </h2>
          <ClerkLoading>
            <button className="shadow-button w-fit bg-primary-purple  active:bg-primary-purple transition text-white font-semibold px-4 py-3 rounded-xl self-center">
              Loading..
            </button>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                afterSignUpUrl="/photo"
                afterSignInUrl="/photo"
              >
                <button className="shadow-button w-fit bg-primary-purple hover:bg-[#8084E2] active:bg-primary-purple transition text-white font-semibold px-4 py-3 rounded-xl self-center">
                  GET STARTED
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <a
                href="/photo"
                className="w-fit shadow-button bg-primary-purple hover:bg-primary-hover_purple active:bg-primary-purple transition text-white font-semibold px-4 py-3 rounded-xl self-center"
              >
                GET STARTED
              </a>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </section>
      <section className="bg-radial-gradient-blue w-full min-h-screen flex flex-col gap-10 justify-center items-center p-4">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <h1 className="text-3xl font-bold xl:text-5xl">
            According to the latest report of a{" "}
            <span className="block mt-3">
              British restaurant chain
              <em> Prezzo</em>:
            </span>
          </h1>
          <em className="text-base lg:text-lg w-5/6 lg:w-3/6">
            “Over 2000 people in UK alone had menu anxiety. <br></br>Prezzo's
            study also found that a third of Gen Zers ask other people to order
            at restaurants because of their <strong>menu anxiety</strong>.”
          </em>
        </div>
      </section>
      <section className="bg-radial-gradient-yellow w-full min-h-screen flex flex-col gap-10 justify-center items-center p-4">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <h1 className="text-3xl font-bold lg:text-4xl xl:text-5xl">
            We might have a solution:{" "}
            <span className="block mt-3">MenuBuddy AI</span>
          </h1>
          <p className="text-base lg:text-lg w-5/6">
            Let AI decide what you can eat based on your preferences. <br></br>
            Just click a photo of the restaurant menu, and get a dish
            recommended by AI.
          </p>
        </div>
        <ClerkLoading>
          <button className="shadow-button w-fit bg-primary-yellow hover:bg-primary-hover_yellow active:bg-primary-yellow transition text-white font-semibold px-4 py-3 rounded-xl self-center">
            Loading..
          </button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton
              afterSignUpUrl="/photo"
              afterSignInUrl="/photo"
            >
              <button className="shadow-button w-fit bg-primary-yellow hover:bg-primary-hover_yellow active:bg-primary-yellow transition text-white font-semibold px-4 py-3 rounded-xl self-center">
                GET STARTED
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <a
              href="/photo"
              className="w-fit shadow-button bg-primary-yellow hover:bg-primary-hover_yellow active:bg-primary-yellow transition text-white font-semibold px-4 py-3 rounded-xl self-center"
            >
              GET STARTED
            </a>
          </SignedIn>
        </ClerkLoaded>
      </section>
    </>
  );
}
