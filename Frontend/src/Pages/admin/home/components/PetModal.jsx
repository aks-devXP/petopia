import React, { useState } from "react";
import { X } from "lucide-react";
export default function PetModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || { name: "", age: "", category: "", breed: "" }
  );

  // keep form in sync when editing different cards
  React.useEffect(() => {
    setForm(initial || { name: "", age: "", category: "", breed: "" });
  }, [initial, open]);

  const isValid =
    form.name.trim() &&
    String(form.age).trim() &&
    !Number.isNaN(Number(form.age)) &&
    form.category.trim() &&
    form.breed.trim();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-app-elevated shadow-3xl">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-stone-200 bg-app-bg/60">
          <div className="inline-flex items-center gap-2">

            <h3 className="text-lg font-bold text-ink-heading">
              {initial ? "Edit Pet" : "Add Pet"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            aria-label="Close"
            type="button"
          >
            <X className="h-5 w-5 text-ink-secondary" />
          </button>
        </div>

        <form
          className="px-5 pb-5 pt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (isValid) onSave({ ...form, age: Number(form.age) });
          }}
        >
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-ink-primary ml-1">Name</label>
            <input
              className="w-full rounded-xl bg-app-bg px-3 py-2 text-ink-primary focus:outline-none focus:ring-2 focus:ring-focus-ring"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Eg. Milo"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-ink-primary ml-1">Age</label>
              <input
                type="number"
                min="0"
                className="w-full rounded-xl bg-app-bg px-3 py-2 text-ink-primary focus:outline-none focus:ring-2 focus:ring-focus-ring"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                placeholder="Eg. 3"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-ink-primary ml-1">Category</label>
              <input
                className="w-full rounded-xl bg-app-bg px-3 py-2 text-ink-primary focus:outline-none focus:ring-2 focus:ring-focus-ring"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Dog / Cat"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-ink-primary ml-1">Breed</label>
            <input
              className="w-full rounded-xl bg-app-bg px-3 py-2 text-ink-primary focus:outline-none focus:ring-2 focus:ring-focus-ring"
              value={form.breed}
              onChange={(e) => setForm((f) => ({ ...f, breed: e.target.value }))}
              placeholder="Eg. Beagle"
              required
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-primary border border-stone-300 bg-app-elevated hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white bg-brand hover:bg-brand-hover active:bg-brand-active disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}