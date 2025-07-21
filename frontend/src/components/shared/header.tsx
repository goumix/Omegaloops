"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

const Header = () => {
  const router = useRouter();

  const handleScroll = () => {
    if (window.location.pathname === "/") {
      const section = document.getElementById("download")
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push("/?scroll=download")
    }
  }
  return (
    <header className="fixed top-0 z-100 bg-stone-800/80 w-full h-14 flex flex-row justify-between items-center px-48 py-10">
      <Link href="/">
        <h1><strong>Omegaloops</strong></h1>
      </Link>
      <nav className="flex flex-row gap-6 py-1 px-6">
        <Link href="/marketplace" className="hover:text-tertiary transition-colors duration-200">Marketplace</Link>
        <Link href="/sharedsamples" className="hover:text-tertiary transition-colors duration-200">Shared your sample</Link>
        <Link href="/createalbum" className="hover:text-tertiary transition-colors duration-200">Create an album</Link>
        <Link href="/whitepaper" className="hover:text-tertiary transition-colors duration-200">Whitepaper</Link>
      </nav>
      <Button variant="tertiary" size="lg" onClick={handleScroll}><Download/>Download</Button>
      <ConnectButton chainStatus="icon" />
    </header>
  );
}

export default Header;
