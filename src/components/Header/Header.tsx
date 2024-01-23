import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full h-fit p-4">
      <div className="flex w-full items-center justify-between text-base font-medium">
        <a href="/">MenuBuddy AI</a>
        <div className="flex gap-8 items-center justify-center">
          <a href="/photo">Home</a>
          <a href="#">About</a>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
