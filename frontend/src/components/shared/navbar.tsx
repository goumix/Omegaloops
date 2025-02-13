import { CirclePlus, ShoppingCart, SquarePlay } from "lucide-react";
import { Button } from "../ui/button";
import Searchbar from "./searchbar";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row w-full h-16 items-center justify-between gap-4 p-4 px-6 bg-stone-700">
      <div className="flex flex-row gap-6 py-2 px-6 bg-stone-500 rounded-full">
        <Link href="/" className="flex flex-row items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          <p>Marketplace</p>
        </Link>
        <Link href="/" className="flex flex-row items-center gap-2">
          <SquarePlay className="w-6 h-6" />
          <p>DAW</p>
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <Searchbar />
        <Button><CirclePlus className="w-6 h-6" />Add sample</Button>
      </div>
    </div>
  );
}
