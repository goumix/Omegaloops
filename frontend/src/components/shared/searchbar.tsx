import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function Searchbar() {
  return (
    <div className="flex flex-row items-center gap-2">
      <Input placeholder="Search" />
      <Button><Search className="w-6 h-6" /></Button>
    </div>
  );
}
