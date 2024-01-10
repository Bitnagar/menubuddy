import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header/Header";
import { UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MenuBuddy AI",
  description: "Lower your menu anxiety. Let MenuBuddy recommend you a dish.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className + " relative"}>
          <Header />
          {children}
          <div
            id="menu_overlay"
            className="hidden w-full h-full top-0 left-0 bg-white items-center flex-col gap-2"
          >
            <Header />
            <div className="w-full h-full text-center flex flex-col items-center justify-center">
              <p>SIGN IN/UP</p>
              <UserButton afterSignOutUrl="/" />
              <p>ABOUT</p>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
