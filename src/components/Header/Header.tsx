import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full h-fit p-4 font-fraunces">
      <div className="flex w-full items-center justify-between text-base">
        <a href="/">MenuBuddy AI</a>
        <div className="flex gap-8 items-center justify-center">
          <a href="/photo">Home</a>
          <a href="/about">About</a>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
