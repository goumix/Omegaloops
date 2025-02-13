"use client";

import { AudioLines, House, SquareLibrary, Scroll, User, UserSearch, BookHeadphones } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const router = usePathname();

  return (
    <div className="flex flex-col w-52 h-screen items-center justify-between gap-4 p-4 bg-stone-700 fixed top-0 left-0 z-20">
      <div className="flex flex-col justify-center gap-8">
        <h1 className="text-2xl font-bold">Omegaloops</h1>
        {router === "/marketplace" || router === "/" ?
          <div className="flex flex-col gap-4">
            <Link href="/marketplace" className="flex flex-row items-center gap-2">
              <House className="w-6 h-6" />
              <p>Home</p>
            </Link>
            <Link href="/marketplace/samples" className="flex flex-row items-center gap-2">
              <AudioLines className="w-6 h-6" />
              <p>Samples</p>
            </Link>
            <Link href="/marketplace/collections" className="flex flex-row items-center gap-2">
              <SquareLibrary className="w-6 h-6" />
              <p>Collections</p>
            </Link>
            <Link href="/marketplace/artists" className="flex flex-row items-center gap-2">
              <UserSearch className="w-6 h-6" />
              <p>Artists</p>
            </Link>
          </div>
          :
          <div className="flex flex-col gap-4">
            <Link href="/daw" className="flex flex-row items-center gap-2">
              <House className="w-6 h-6" />
              <p>Home</p>
            </Link>
            <Link href="/daw/projects" className="flex flex-row items-center gap-2">
              <BookHeadphones className="w-6 h-6" />
              <p>Projects</p>
            </Link>
          </div>
        }
      </div>
      <div className="w-full flex flex-col gap-4 p-4">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Scroll className="w-6 h-6" />
          <p>White paper</p>
        </Link>
        <Link href="/" className="flex flex-row items-center gap-2">
          <User className="w-6 h-6" />
          <p>Profil</p>
        </Link>
        <Button>Connect Wallet</Button>
      </div>
    </div>
  );
}
