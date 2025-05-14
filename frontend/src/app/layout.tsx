import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils"
import RainbowkitAndWagmiProvider from "./RainbowKitAndWagmiProvider";
import Layout from "@/components/shared/layout";

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Omegaloops",
  description: "A dApp transforming the sample industry by enabling tokenization and trading of audio samples",
  openGraph:{
    type: "website",
    locale: "en_US",
    url: "https://omegaloops.app",
    siteName: "Omegaloops",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen antialiased bg-stone-900 text-white",
          fontSans.className
        )}
      >
        <RainbowkitAndWagmiProvider>
          <Layout>
            {children}
          </Layout>
        </RainbowkitAndWagmiProvider>
        <Toaster />
      </body>
    </html>
  )
}
