import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const GalleryLightbox = ({ images = [], initialIndex = 0, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const total = safeImages.length;

  useEffect(() => {
    if (!safeImages.length) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      } else if (event.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % safeImages.length);
      } else if (event.key === "ArrowLeft") {
        setCurrent((prev) => (prev - 1 + safeImages.length) % safeImages.length);
      }
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [safeImages.length, onClose]);

  useEffect(() => {
    if (initialIndex >= 0 && initialIndex < safeImages.length) {
      setCurrent(initialIndex);
    }
  }, [initialIndex, safeImages.length]);

  if (!safeImages.length) return null;

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % safeImages.length);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/55 backdrop-blur-[2px] px-4 py-10"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[960px] flex-col overflow-hidden rounded-3xl bg-white/95 shadow-[0_35px_90px_rgba(0,0,0,0.28)] transition md:w-[65vw] md:max-h-[70vh] lg:w-[55vw]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white transition hover:bg-black"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex-1 w-full bg-black min-h-[220px] md:min-h-[380px]">
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink-heading">
            {current + 1} / {total}
          </span>
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-3 text-ink-heading transition hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-3 text-ink-heading transition hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <img
            src={safeImages[current]}
            alt={`Gallery image ${current + 1}`}
            className="h-full w-full object-cover"
          />

          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1">
              {safeImages.map((_, index) => (
                <span
                  key={`dot-${index}`}
                  className={`h-1.5 w-6 rounded-full transition ${
                    index === current ? "bg-brand" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {total > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto px-5 py-4 bg-white/90">
            {safeImages.map((image, index) => (
              <button
                key={image + index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  index === current ? "border-brand" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryLightbox;
