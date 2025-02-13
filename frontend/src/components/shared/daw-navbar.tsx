import { Button } from "../ui/button";
import { Download, Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";

export default function DawNavbar() {
  return (
    <div className="flex flex-row w-5/6 h-16 items-center justify-between gap-4 m-4 px-4 rounded-full bg-stone-500 fixed top-16 left-52 z-10">
      <div className="flex flex-row gap-4 p-1">
        <Button><Pause className="w-6 h-6" color="black" /></Button>
        <Button><Play className="w-6 h-6" color="black" /></Button>
        <Button><SkipBack className="w-6 h-6" color="black" /></Button>
        <Button><Square className="w-6 h-6" color="black" /></Button>
        <Button><SkipForward className="w-6 h-6" color="black" /></Button>
      </div>
      <div className="flex flex-row gap-4 p-1">
        <Button><Download className="w-6 h-6" color="black" />Export sample</Button>
      </div>
    </div>
  );
}
