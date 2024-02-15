export default function Footer() {
  const date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="w-full flex items-center justify-center font-fraunces">
      <div>
        <span className="text-sm">
          <a
            className="underline"
            href="https://twitter.com/bitnagar"
          >
            bitnagar{" "}
          </a>
          © {year}
        </span>
      </div>
    </footer>
  );
}
