import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-14 flex flex-row justify-between items-center px-48 py-12">
      <Link href="/">
        <h1><strong>Omegaloops</strong></h1>
      </Link>
      <nav className="flex flex-row gap-6 py-1 px-6">
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/sharedsamples">Shared your samples</Link>
        <Link href="/createalbum">Create an album</Link>
        <Link href="/ownsamples">Own samples</Link>
        <Link href="/whitepaper">Whitepaper</Link>
      </nav>
      <Button variant="tertiairy" size="lg"><Download/>Download</Button>
      <ConnectButton chainStatus="icon" />
    </header>
  );
}

export default Header;
