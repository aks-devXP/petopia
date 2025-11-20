import { Image as ImageIcon, Loader2, Trash2, UploadCloud, X } from "lucide-react";
import React, { useRef, useState } from "react";

const MAX_MB = 5;

export default function PetModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || { name: "", age: "", category: "", breed: "", photo: "" }
  );
  const [file, setFile] = useState(null);             // new file selected
  const [preview, setPreview] = useState(initial?.photo || ""); // preview URL
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  // keep form in sync when editing different cards
  React.useEffect(() => {
    setForm(initial || { name: "", age: "", category: "", breed: "", photo: "" });
    setFile(null);
    setPreview(initial?.photo || "");
    setError("");
    setIsSaving(false);
  }, [initial, open]);

  const isValid =
    form.name.trim() &&
    String(form.age).trim() &&
    !Number.isNaN(Number(form.age)) &&
    form.category.trim() &&
    form.breed.trim();

  if (!open) return null;

  // --- file helpers ---
  const validateAndSetFile = (f) => {
    if (!f) return;
    if (!f.type?.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    const tooBig = f.size / (1024 * 1024) > MAX_MB;
    if (tooBig) {
      setError(`Image size must be ≤ ${MAX_MB} MB.`);
      return;
    }
    setError("");
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const onInputChange = (e) => {
    const f = e.target.files?.[0];
    validateAndSetFile(f);
    // Reset the input value to allow selecting the same file again
    if (e.target) {
      e.target.value = '';
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer?.files?.[0];
    validateAndSetFile(f);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clearPhoto = () => {
    setFile(null);
    setPreview("");
    setError("");
    // keep existing form.photo untouched; your save handler can decide to delete old if preview cleared
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isSaving) return;
    
    setIsSaving(true);
    try {
      await onSave(
        { ...form, age: Number(form.age) }, 
        file, 
        { previewCleared: !preview && !!initial?.photo },
        
      );
      // Reset form state after successful save
      setFile(null);
    } catch (err) {
      // Error handling is done in parent component
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-app-elevated shadow-3xl rounded-xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-stone-200 bg-app-bg/60">
          <div className="inline-flex items-center gap-2">
            <h3 className="text-lg font-bold text-ink-heading">
              {initial ? "Edit Pet" : "Add Pet"}
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="rounded-full p-1.5 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close"
            type="button"
          >
            <X className="h-5 w-5 text-ink-secondary" />
          </button>
        </div>

        <form
          className="px-5 pb-5 pt-4 space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-ink-primary ml-1">Name</label>
            <input
              className="w-full rounded-xl bg-app-bg px-3 py-2 text-ink-primary focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Eg. Milo"
              disabled={isSaving}
              required
            />
          </div>

          {/* Age + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-ink-primary ml-1">Age</label>
              <input
                type="number"
                min="0"
                className="w-full rounded-xl bg-app-bg px-3 py-2 text-ink-primary focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                placeholder="Eg. 3"
                disabled={isSaving}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-ink-primary ml-1">Category</label>
              <input
                className="w-full rounded-xl bg-app-bg px-3 py-2 text-ink-primary focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="Dog / Cat"
                disabled={isSaving}
                required
              />
            </div>
          </div>

          {/* Breed */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-ink-primary ml-1">Breed</label>
            <input
              className="w-full rounded-xl bg-app-bg px-3 py-2 text-ink-primary focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
              value={form.breed}
              onChange={(e) => setForm((f) => ({ ...f, breed: e.target.value }))}
              placeholder="Eg. Beagle"
              disabled={isSaving}
              required
            />
          </div>

          {/* Photo Uploader */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-ink-primary ml-1">Photo (optional)</label>

            {/* Preview */}
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-app-bg">
                <img
                  src={preview}
                  alt="Pet preview"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-ink-primary border hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UploadCloud className="w-4 h-4" />
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={clearPhoto}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              // Dropzone
              <div
                ref={dropRef}
                onDrop={onDrop}
                onDragOver={onDragOver}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cream-mid bg-app-bg px-4 py-8 text-center hover:border-brand transition-colors ${isSaving ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <ImageIcon className="w-8 h-8 text-ink-secondary" />
                <p className="text-sm text-ink-secondary">
                  Drag & drop an image here, or{" "}
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={isSaving}
                    className="text-brand underline underline-offset-2 hover:text-brand-hover disabled:opacity-50"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-ink-tertiary mt-1">
                  JPG, PNG, or WEBP — up to {MAX_MB} MB
                </p>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onInputChange}
              disabled={isSaving}
              className="hidden"
            />

            {error && (
              <p className="text-xs text-red-600 mt-1">{error}</p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-primary border border-stone-300 bg-app-elevated hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || isSaving}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white bg-brand hover:bg-brand-hover active:bg-brand-active disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-focus-ring min-w-[80px] inline-flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}