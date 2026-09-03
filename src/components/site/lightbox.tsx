import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

export type LightboxImage = { src: string; alt: string };

export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndexChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  if (!open || index === null) return null;
  const current = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4 animate-in fade-in duration-300"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-ivory hover:text-gold"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous image"
        className="absolute left-2 flex h-12 w-12 items-center justify-center text-ivory hover:text-gold sm:left-6"
      >
        <ChevronLeft className="h-7 w-7" aria-hidden="true" />
      </button>
      <figure className="max-h-[85vh] max-w-5xl">
        <img
          src={current?.src}
          alt={current?.alt ?? ""}
          className="max-h-[78vh] w-auto object-contain"
        />
        <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-ivory/70">
          {current?.alt} — {index + 1} / {images.length}
        </figcaption>
      </figure>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next image"
        className="absolute right-2 flex h-12 w-12 items-center justify-center text-ivory hover:text-gold sm:right-6"
      >
        <ChevronRight className="h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  );
}
