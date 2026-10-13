import { useEffect, useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { MAX_PHOTO_MB } from '@/config/constants';
import Button from '@/components/ui/Button';

export default function PhotoUpload({ file, onChange, error }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!file) { setPreview(null); return undefined; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (e) => {
    const next = e.target.files?.[0];
    if (next) onChange(next);
    e.target.value = '';
  };

  return (
    <div>
      <input ref={inputRef} id="photo" type="file" accept="image/*" className="sr-only" onChange={pick} />
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Selected issue" className="h-48 w-full max-w-sm rounded-xl border border-paper-line object-cover" />
          <Button type="button" variant="secondary" size="sm" className="absolute right-2 top-2" onClick={() => onChange(null)} aria-label="Remove photo">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-ink-soft transition-colors hover:border-signal hover:bg-signal-tint/50 ${error ? 'border-priority-critical' : 'border-paper-line'}`}
        >
          <Camera className="h-7 w-7" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Add a photo</span>
          <span className="text-xs">JPG or PNG, up to {MAX_PHOTO_MB} MB. Photos make reports easier to verify.</span>
        </button>
      )}
      {error && <p className="mt-1 text-sm font-medium text-priority-critical">{error}</p>}
    </div>
  );
}
