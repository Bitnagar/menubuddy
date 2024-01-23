import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full h-fit p-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-medium">MenuBuddy AI</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
