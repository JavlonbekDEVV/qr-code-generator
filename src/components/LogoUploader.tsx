import { useRef, useState } from 'react';
import { ImagePlus, Upload, X } from 'lucide-react';

interface LogoUploaderProps {
  logoPreviewUrl: string | null;
  onLogoSelect: (file: File | null) => void;
}

export function LogoUploader({ logoPreviewUrl, onLogoSelect }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    if (files && files[0]) {
      onLogoSelect(files[0]);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  if (logoPreviewUrl) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-emerald-700/60 bg-emerald-900/50 p-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-emerald-700/40 bg-white">
          <img
            src={logoPreviewUrl}
            alt="Logo preview"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-200">Logo added</p>
          <p className="text-xs text-gray-500">
            Will appear in the center of your QR code
          </p>
        </div>
        <button
          onClick={() => onLogoSelect(null)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-700 text-gray-400 transition-colors hover:border-red-500/50 hover:text-red-400"
          aria-label="Remove logo"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
        dragging
          ? 'border-lime-400 bg-lime-400/10'
          : 'border-emerald-700/60 bg-emerald-900/30 hover:border-lime-500/40 hover:bg-emerald-850/40'
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-800/60">
        <ImagePlus className="h-6 w-6 text-lime-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-200">
          Drag & drop your logo here
        </p>
        <p className="mt-1 text-xs text-gray-500">
          or{' '}
          <span className="font-medium text-lime-400 underline-offset-2 hover:underline">
            Browse files
          </span>
        </p>
      </div>
      <p className="text-xs text-gray-600">PNG, JPG, SVG — up to 2MB</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Upload className="h-3.5 w-3.5 text-gray-600" />
    </div>
  );
}
