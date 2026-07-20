"use client";

import { useEffect, useRef, useState } from "react";

interface ExportMenuProps {
  onPdf: () => void;
  onWord: () => void;
}

export default function ExportMenu({
  onPdf,
  onWord,
}: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative inline-block"
    >
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
      >
        Export ▼
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-lg border bg-white shadow-xl">

          <button
            onClick={() => {
              onPdf();
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100"
          >
            📄 Export as PDF
          </button>

          <button
            onClick={() => {
              onWord();
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100"
          >
            📝 Export as Word (.docx)
          </button>

        </div>
      )}
    </div>
  );
}