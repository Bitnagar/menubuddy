import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Header/footer/Footer";

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
        <body className={inter.className + " bg-radial-gradient-purple"}>
          <Header />
          <main className="w-full flex flex-col grow">{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              success: {
                duration: 6000,
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
