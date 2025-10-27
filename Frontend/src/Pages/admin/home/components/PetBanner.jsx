import React, { useMemo, useState } from "react";
import { Plus, ChevronLeft, ChevronRight, PawPrint, Edit3, X } from "lucide-react";
import PetCard from "./PetCard";
import PetModal from "./PetModal";
/**
 * PetBanner
 * - Left: heading + description + Add Pet button
 * - Right: simple horizontal slider of pet cards (click to edit)
 * - Modal: add/edit pet (name, age, category, breed) with Save/Cancel
 *
 * Drop-in .jsx component. Dummy data included.
 */

const DUMMY_PETS = [
  {
    id: "p1",
    name: "Milo",
    age: 2,
    category: "Dog",
    breed: "Beagle",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1280&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "Luna",
    age: 3,
    category: "Cat",
    breed: "Siamese",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1280&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Buddy",
    age: 4,
    category: "Dog",
    breed: "Golden Retriever",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=1280&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Coco",
    age: 1,
    category: "Cat",
    breed: "British Shorthair",
    image:
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1280&auto=format&fit=crop",
  },
];

export default function PetBanner() {
  const [pets, setPets] = useState(DUMMY_PETS);
  const [idx, setIdx] = useState(0); // slider index
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // pet being edited, or null

  // show 3 cards in view (if fewer, show fewer)
  const pageSize = 3;
  const pages = useMemo(() => Math.max(1, Math.ceil(pets.length / pageSize)), [pets.length]);
  const pageIndex = Math.min(idx, pages - 1);

  const pagePets = useMemo(() => {
    const start = pageIndex * pageSize;
    return pets.slice(start, start + pageSize);
  }, [pets, pageIndex]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(pet) {
    setEditing(pet);
    setModalOpen(true);
  }

  function handleSave(form) {
    if (editing) {
      setPets((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p)));
    } else {
      const newPet = {
        id: "p" + Math.random().toString(36).slice(2, 9),
        image:
          "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1280&auto=format&fit=crop",
        ...form,
      };
      setPets((prev) => [newPet, ...prev]);
      setIdx(0);
    }
    setModalOpen(false);
  }

  function prev() {
    setIdx((i) => Math.max(0, i - 1));
  }
  function next() {
    setIdx((i) => Math.min(pages - 1, i + 1));
  }

  return (
    <section className="w-full overflow-hidden">
    {/* Content row: left copy / right slider (stacks on small screens) */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 px-5 items-center">
        {/* Left copy (visible on mobile too) */}
        <div className="md:col-span-2">
        <div className="flex items-center gap-4">
            <PawPrint className="h-12 w-12 md:h-24 md:w-24 text-brand" />
            <h3 className="mt-2 text-2xl md:text-4xl font-nunitoBlack text-brand">
            Manage Your Pets
            </h3>
        </div>
        <p className="mt-1 text-ink-secondary/90">
            Add or update pet details here to keep profiles accurate and easy to manage.
        </p>
        </div>

        {/* Right slider */}
        <div className="md:col-span-3">
        <div className="relative">
            {/* Controls row: one line, right aligned */}
            <div className="flex items-center justify-between gap-4 p-4 pr-0">
            {/* Nav controls + page indicator */}
            <div className="flex items-center gap-3">
                <button
                onClick={prev}
                className="shrink-0 rounded-full p-2 border border-stone-300 bg-app-elevated 
                            hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                aria-label="Previous"
                type="button"
                >
                <ChevronLeft className="h-5 w-5 text-ink-primary" />
                </button>

                <div className="shrink-0 min-w-[88px] text-center text-sm text-ink-secondary/90">
                {String(pageIndex + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}
                </div>

                <button
                onClick={next}
                className="shrink-0 rounded-full p-2 border border-stone-300 bg-app-elevated 
                            hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                aria-label="Next"
                type="button"
                >
                <ChevronRight className="h-5 w-5 text-ink-primary" />
                </button>
            </div>

            {/* Add button: bold + only */}
            <button
                onClick={openAdd}
                type="button"
                aria-label="Add Pet"
                className="inline-flex items-center justify-center rounded-full bg-brand text-white font-extrabold
                        w-10 h-10 md:w-11 md:h-11 hover:bg-brand-hover active:bg-brand-active
                        focus:outline-none focus:ring-2 focus:ring-focus-ring shrink-0"
                title="Add Pet"
            >
                <Plus className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            </div>

            {/* Cards row */}
            <div className="flex gap-4 overflow-hidden">
            {pagePets.map((pet) => (
                <PetCard key={pet.id} pet={pet} onClick={() => openEdit(pet)} />
            ))}

            {/* If fewer than 3 pets on last page, fill with subtle placeholders */}
            {pagePets.length < pageSize &&
                Array.from({ length: pageSize - pagePets.length }).map((_, i) => (
                <div
                    key={`ph-${i}`}
                    className="aspect-[4/5] w-48 sm:w-56 shrink-0 rounded-2xl border border-dashed border-stone-300
                            grid place-items-center text-ink-secondary/70"
                >
                    Empty
                </div>
                ))}
            </div>
        </div>
</div>

    </div>

    <PetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
    />
    </section>

  );
}
