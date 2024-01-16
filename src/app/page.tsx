/* eslint-disable react/no-unescaped-entities */
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <section className="w-full min-h-screen flex flex-col gap-10 justify-center text-center">
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-5xl">
            84% of Gen Z’s suffer from menu anxiety.
          </h1>
          <h2 className=" font-normal text-xl">
            MenuBuddy AI is here to help them.
          </h2>
        </div>
        <ClerkLoading>
          <button className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center">
            Loading..
          </button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton
              afterSignUpUrl="/photo"
              afterSignInUrl="/photo"
            >
              <button className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center">
                GET STARTED
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <a
              href="/photo"
              className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center"
            >
              GET STARTED
            </a>
          </SignedIn>
        </ClerkLoaded>
      </section>
      <section className="w-full min-h-screen flex flex-col gap-10 justify-center">
        <h1 className="font-bold text-3xl text-left">
          According to the latest report of a British restaurant chain
          <em>Prezzo</em>:
        </h1>
        <em>
          “Over 2000 people in UK alone had menu anxiety. Prezzo's study also
          found that a third of Gen Zers ask other people to order at
          restaurants because of their <strong>menu anxiety</strong>.”
        </em>
      </section>
      <section className="w-full min-h-screen flex flex-col gap-10 justify-center">
        <h1 className="font-bold text-5xl text-left">
          We might have a solution: MenuBuddy AI
        </h1>
        <p>
          Let AI decide what you can eat based on your preferences. Just click a
          photo of the restaurant menu, and get a dish recommended by AI.
        </p>
        <ClerkLoading>
          <button className="w-fit bg-black text-white font-semibold p-2 rounded-md">
            Loading..
          </button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton
              afterSignUpUrl="/photo"
              afterSignInUrl="/photo"
            >
              <button className="w-fit bg-black text-white font-semibold p-2 rounded-md">
                GET STARTED
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <a
              href="/photo"
              className="w-fit bg-black text-white font-semibold p-2 rounded-md"
            >
              GET STARTED
            </a>
          </SignedIn>
        </ClerkLoaded>
      </section>
    </main>
  );
}
