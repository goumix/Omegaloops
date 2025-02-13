import { AudioLines, House, SquareLibrary, SquarePlay, UserRound } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-48 h-screen items-center justify-between gap-4 p-4 bg-stone-700">
      <div className="flex flex-col justify-center gap-8">
        <h1 className="text-2xl font-bold">Omegaloops</h1>
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex flex-row items-center gap-2">
            <House className="w-6 h-6" />
            <p>Home</p>
          </Link>
          <Link href="/" className="flex flex-row items-center gap-2">
            <AudioLines className="w-6 h-6" />
            <p>Samples</p>
          </Link>
          <Link href="/" className="flex flex-row items-center gap-2">
            <SquareLibrary className="w-6 h-6" />
            <p>Collection</p>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 p-4">
        <Link href="/" className="flex flex-row items-center gap-2">
          <UserRound className="w-6 h-6" />
          <p>Profil</p>
        </Link>
        <Link href="/" className="flex flex-row items-center gap-2">
          <SquarePlay className="w-6 h-6" />
          <p>DAW</p>
        </Link>
      </div>
    </div>
  );
}
