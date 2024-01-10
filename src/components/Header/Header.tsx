import MenuIcon from "./MenuIcon";

export default function Header() {
  return (
    <header className="p-5 bg-gray-400 w-full h-20">
      <div className="flex w-full items-center justify-between">
        <h1>MenuBuddy AI</h1>
        <MenuIcon />
      </div>
    </header>
  );
}
