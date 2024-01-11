import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="w-full h-[90%] flex items-center justify-center p-4">
      <div className="text-center h-1/2 flex flex-col gap-10 justify-center">
        <div className="h-1/2 flex flex-col justify-evenly">
          <h2 className="font-bold text-5xl">
            84% of Gen Z’s suffer from menu anxiety.
          </h2>
          <h2 className="font-medium text-xl">
            Menu-Buddy AI is here to help them.
          </h2>
        </div>
        <ClerkLoading>
          <button className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center">
            Loading..
          </button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignInButton
              afterSignInUrl="/photo"
              afterSignUpUrl="/photo"
            >
              <button className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center">
                GET STARTED
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a
              href="/photo"
              className="w-fit bg-black text-white font-semibold p-2 rounded-md self-center"
            >
              Take me to the app.
            </a>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </main>
  );
}
