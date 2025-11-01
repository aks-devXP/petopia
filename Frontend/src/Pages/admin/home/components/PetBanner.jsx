import React, { useEffect, useMemo, useRef, useState } from "react";
import { Plus, ChevronLeft, ChevronRight, PawPrint } from "lucide-react";
import PetCard from "./PetCard";
import PetModal from "./PetModal";

const DUMMY_PETS = [
  { id: "p1", name: "Milo", age: 2, category: "Dog", breed: "Beagle",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1280&auto=format&fit=crop" },
  { id: "p2", name: "Luna", age: 3, category: "Cat", breed: "Siamese",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1280&auto=format&fit=crop" },
  { id: "p3", name: "Buddy", age: 4, category: "Dog", breed: "Golden Retriever",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=1280&auto=format&fit=crop" },
  { id: "p4", name: "Coco", age: 1, category: "Cat", breed: "British Shorthair",
    image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1280&auto=format&fit=crop" },
];

export default function PetBanner() {
  const [pets, setPets] = useState(DUMMY_PETS);
  const [cursor, setCursor] = useState(0); // left index of 2-card window
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // build items + one trailing placeholder to allow "[last, empty]"
  const items = useMemo(() => [...pets, { id: "__empty__", empty: true }], [pets]);

  // bounds: we can start at 0 up to pets.length - 1
  const maxCursor = Math.max(0, pets.length - 1);
  const clampedCursor = Math.min(Math.max(cursor, 0), maxCursor);

  // measure card step (width + gap) and fix viewport width to exactly 2 cards
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [stepPx, setStepPx] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!track || !vp) return;

      // pick first two children to infer width and gap
      const first = track.children[0];
      const second = track.children[1];
      if (!first || !second) return;

      const firstRect = first.getBoundingClientRect();
      const secondRect = second.getBoundingClientRect();
      const step = Math.round(secondRect.left - firstRect.left); // width + gap
      if (step <= 0) return;

      setStepPx(step);

      // viewport width should be exactly 2 * cardWidth + 1 * gap => 2*step - gap
      // Derive gap by measuring child width
      const childWidth = Math.round(firstRect.width);
      const gap = step - childWidth;
      const vpWidth = 2 * childWidth + gap; // exactly two cards visible
      setViewportWidth(vpWidth);
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pets.length]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(pet) {
    if (!pet?.empty) {
      setEditing(pet);
      setModalOpen(true);
    }
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
      setCursor(0);
    }
    setModalOpen(false);
  }

  const prev = () => setCursor((i) => Math.max(0, i - 1));          // slide by 1
  const next = () => setCursor((i) => Math.min(maxCursor, i + 1));  // slide by 1

  // transform for smooth slide
  const translateX = -(clampedCursor * stepPx);

  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 px-5 items-center">
        {/* Left copy */}
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
            {/* Controls */}
            <div className="flex items-center justify-between gap-4 p-4 pr-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="shrink-0 rounded-full p-2 border border-stone-300 bg-app-elevated hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  aria-label="Previous" type="button">
                  <ChevronLeft className="h-5 w-5 text-ink-primary" />
                </button>

                {/* Simple indicator: left index + 1 of total windows */}
                <div className="shrink-0 min-w-[120px] text-center text-sm text-ink-secondary/90">
                  {String(clampedCursor + 1).padStart(2, "0")} / {String(Math.max(1, pets.length)).padStart(2, "0")}
                </div>

                <button
                  onClick={next}
                  className="shrink-0 rounded-full p-2 border border-stone-300 bg-app-elevated hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  aria-label="Next" type="button">
                  <ChevronRight className="h-5 w-5 text-ink-primary" />
                </button>
              </div>

              <button
                onClick={openAdd} type="button" aria-label="Add Pet"
                className="inline-flex items-center justify-center rounded-full bg-brand text-white font-extrabold
                           w-10 h-10 md:w-11 md:h-11 hover:bg-brand-hover active:bg-brand-active
                           focus:outline-none focus:ring-2 focus:ring-focus-ring shrink-0"
                title="Add Pet">
                <Plus className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            {/* Viewport: fixed to exactly two-card width */}
            <div
              ref={viewportRef}
              className="overflow-hidden"
              style={{ width: viewportWidth ? `${viewportWidth}px` : undefined }}
            >
              {/* Track */}
              <div
                ref={trackRef}
                className="flex gap-4 will-change-transform"
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: "transform 500ms ease-out",
                }}
              >
                {items.map((pet) =>
                  pet.empty ? (
                    <div
                      key="empty-tail"
                      className="aspect-[4/5] w-48 sm:w-56 shrink-0 rounded-2xl border border-dashed border-stone-300
                                 grid place-items-center text-ink-secondary/70"
                    >
                      Empty
                    </div>
                  ) : (
                    <div key={pet.id} className="shrink-0">
                      <PetCard pet={pet} onClick={() => openEdit(pet)} />
                    </div>
                  )
                )}
              </div>
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
