import DawNavbar from "@/components/shared/daw-navbar";

export default function Daw() {
  return (
    <div className="w-full h-screen bg-stone-700 p-6 flex flex-row gap-16">
      <DawNavbar />
      <div className="w-full h-full pl-52 pt-16 bg-stone-700">
        <p>test</p>
      </div>
    </div>
  );
}
