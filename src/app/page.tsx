export default function Home() {
  return (
    <main className="w-full h-full flex items-center justify-center p-4">
      <div className="text-center h-1/2 flex flex-col gap-10">
        <div className="h-1/2 flex flex-col justify-around">
          <h2>84% of Gen Z’s suffer from menu anxiety.</h2>
          <h2>Menu-Buddy AI is here to help them.</h2>
        </div>
        <a
          className=" bg-[#D9D9D9] p-4"
          href="/photo"
        >
          GET STARTED
        </a>
      </div>
    </main>
  );
}
