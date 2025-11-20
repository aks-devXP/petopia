import { Edit3 } from "lucide-react";
import { useEffect, useState } from "react";

export default function PetCard({ pet, onClick }) {
  // console.log(pet);
  const [photo,setPhoto] = useState("https://res.cloudinary.com/dvjcvwp61/image/upload/v1762546264/Gemini_Generated_Image_iqz1xuiqz1xuiqz1_lr0lce.png")
  useEffect(()=>{
    if(pet.photo){
      
      setPhoto(pet.photo);
    }
  },[pet])
  
  return (
    <button
      onClick={onClick}
      className="group relative aspect-[4/5] w-48 sm:w-56 shrink-0 
      overflow-hidden rounded-3xl border bg-app-elevated text-left 
      shadow-sm hover:shadow-md hover:-translate-y-0.5 transition will-change-transform 
      focus:outline-none focus:ring-2 focus:ring-focus-ring px-2 pt-2 pb-3 justify-between flex flex-col"
      aria-label={`Edit ${pet.name}`}
      type="button"
    >
      <div className="h-full flex-1 w-full flex flex-col">
          <img
            src={photo}
            alt={`${pet.name}`}
            className="aspect-square w-full object-cover rounded-2xl"
            loading="lazy"
          />
          <p className="px-2 mt-1 font-bold text-xl text-ink-primary truncate">{pet.name}</p>
          
      </div><div className="px-2">
        
        <div className="flex justify-between">
            <p className="text-md text-ink-secondary/90 truncate">
              {pet.category} ({pet.breed})
            </p>
            <p className="text-sm text-ink-secondary/90 truncate">
              
            </p>
            <p className="text-md text-ink-secondary/80">Age: {pet.age}</p>
        </div>
        </div>
      <div className="absolute right-4 top-4 rounded-full bg-app-elevated/90 p-1.5 border border-stone-200 opacity-0 group-hover:opacity-100 transition">
        <Edit3 className="h-4 w-4 text-ink-secondary" />
      </div>
    </button>
  );
}