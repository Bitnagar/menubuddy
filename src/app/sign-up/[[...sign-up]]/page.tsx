import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="w-full h-[90%] flex items-center justify-center">
      <SignUp />
    </section>
  );
}
