import { useState } from "react";
import { Dog, Cat, Utensils, Scissors, GraduationCap } from "lucide-react";

const tips = {
  Dogs: {
    Feeding: [
      "Avoid overfeeding – Obesity leads to joint problems and diabetes. Follow portion guidelines based on weight and activity level.",
      "No human junk food – Chocolate, grapes, onions, and artificial sweeteners (like xylitol) are toxic to dogs.",
      "Regular meal schedule – Helps with digestion and prevents begging behavior.",
      "Slow feeding for fast eaters – Use a slow-feeder bowl to prevent bloating and choking.",
      "Fresh water is a must – Change water at least twice a day to keep them hydrated."
    ],
    Grooming: [
      "Regular brushing prevents shedding mess – Short-haired dogs need weekly brushing; long-haired breeds may need daily brushing.",
      "Bath once a month (or as needed) – Too many baths strip natural oils, causing dry skin.",
      "Trim nails every 3-4 weeks – Overgrown nails can cause pain and affect posture.",
      "Clean ears regularly – Especially for floppy-eared dogs prone to infections.",
      "Use dog-specific shampoo – Human shampoos can irritate their skin due to different pH levels."
    ],
    Training: [
      "Start training early – Puppies learn faster, but older dogs can still be trained with patience.",
      "Positive reinforcement works best – Reward good behavior with treats and praise instead of punishment.",
      "Be consistent with commands – Use the same words like 'sit' and 'stay' to avoid confusion.",
      "Short training sessions (5-10 mins) – Keeps them engaged without boredom.",
      "Socialization is key – Expose dogs to different people, sounds, and places early on to prevent fear and aggression."
    ]
  },
  Cats: {
    Feeding: [
      "Cats are obligate carnivores – They need meat-based food for proper nutrition.",
      "Dry food isn’t enough – Include wet food to keep them hydrated and prevent urinary problems.",
      "Small, frequent meals mimic nature – Cats naturally eat multiple small meals a day instead of two large ones.",
      "Avoid milk – Despite common belief, most cats are lactose intolerant.",
      "Feeding in a quiet place – Cats feel more comfortable eating in a calm, stress-free area."
    ],
    Grooming: [
      "Cats groom themselves, but brushing helps – It reduces shedding and prevents hairballs.",
      "Avoid frequent baths – Cats rarely need baths unless dirty or prescribed by a vet.",
      "Trim claws every 2-3 weeks – This prevents furniture damage and keeps their paws healthy.",
      "Clean their ears gently – Use a damp cotton ball, but don’t go too deep.",
      "Provide scratching posts – Helps maintain claw health and prevents furniture damage."
    ],
    Training: [
      "Use treats and praise – Cats respond best to positive reinforcement.",
      "Litter box training is easy – Just place them in the box after meals, and they usually learn quickly.",
      "Discourage bad behavior gently – Redirect instead of punishing (e.g., use a scratching post instead of scolding for clawing furniture).",
      "Clicker training works for cats too – Reward them with treats when they respond to commands.",
      "Routine builds trust – Cats prefer predictability, so train at the same time daily."
    ]
  }
};

export default function PetCareTips({ petSelected, tipSelected }) {
  const icons = {
    Feeding: <Utensils size={20} className="mr-2" />,
    Grooming: <Scissors size={20} className="mr-2" />,
    Training: <GraduationCap size={20} className="mr-2" />
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold flex items-center mb-3 text-black">
        {petSelected === "Dogs" ? <Dog size={28} className="mr-2 text-[#3C2A21]" /> : <Cat size={28} className="mr-2 text-[#4B164C]" />}
        {petSelected} Care Tips - {tipSelected}
      </h2>
      <ul className="list-disc list-inside space-y-2">
        {tips[petSelected][tipSelected].map((tip, index) => (
          <li key={index} className="text-gray-700 flex items-start">
            {icons[tipSelected]} <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
