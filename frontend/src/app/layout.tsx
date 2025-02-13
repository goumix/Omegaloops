import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/shared/navbar";
import Footer from "../components/shared/footer";
import Sidebar from "../components/shared/sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omegaloops",
  description: "A dApp to tokenize samples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="max-w-screen min-h-screen flex flex-row">
          <Sidebar />
          <div className="flex flex-col w-full h-full">
            <Navbar />
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
