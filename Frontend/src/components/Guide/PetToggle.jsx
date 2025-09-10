import { Dog, Cat } from "lucide-react";

export default function PetToggle({ petSelected, setPetSelected }) {
  return (
    <div
      className={`flex items-center p-1 w-48 rounded-full cursor-pointer transition-colors ${
        petSelected === "Dogs" ? "bg-[#3C2A21]" : "bg-[#4B164C]"
      }`}
      onClick={() => setPetSelected(petSelected === "Dogs" ? "Cats" : "Dogs")}
    >
      <div
        className={`flex items-center justify-center w-1/2 py-2 rounded-full transition-all ${
          petSelected === "Dogs" ? "bg-white text-[#3C2A21]" : "text-white"
        }`}
      >
        <Dog className="mr-2" size={18} />
        Dogs
      </div>
      <div
        className={`flex items-center justify-center w-1/2 py-2 rounded-full transition-all ${
          petSelected === "Cats" ? "bg-white text-[#4B164C]" : "text-white"
        }`}
      >
        <Cat className="mr-2" size={18} />
        Cats
      </div>
    </div>
  );
}
