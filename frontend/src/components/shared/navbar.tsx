"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
// import Searchbar from "./searchbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = usePathname();

  return (
    <div className="flex flex-row w-full h-16 items-center justify-between gap-4 p-4 px-6 bg-stone-700 fixed top-0 left-0 z-10 pl-52">
      <div className="flex flex-row gap-4 p-1 bg-stone-500 rounded-full">
        <Link href="/marketplace" className={`flex flex-row items-center gap-2 p-2 px-4 ${(router === "/marketplace" || router === "/") ? "bg-white rounded-full" : ""}`}>
          <p className={`font-bold ${(router === "/marketplace" || router === "/") ? "text-black" : ""}`}>Marketplace</p>
        </Link>
        <Link href="/daw" className={`flex flex-row items-center gap-2 p-2 px-4 ${(router === "/daw") ? "bg-white rounded-full" : ""}`}>
          <p className={`font-bold ${(router === "/daw") ? "text-black" : ""}`}>DAW</p>
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        {/* <Searchbar /> */}
        {router === "/marketplace" || router === "/" ?
          <Button><CirclePlus className="w-6 h-6" color="black" />Add sample/collection</Button>
          :
          <Button><CirclePlus className="w-6 h-6" color="black" />Create project</Button>
        }
      </div>
    </div>
  );
}
