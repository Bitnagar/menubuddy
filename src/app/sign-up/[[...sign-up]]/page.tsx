import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="purple w-full h-screen flex items-center justify-center">
      <SignUp />
    </section>
  );
}
