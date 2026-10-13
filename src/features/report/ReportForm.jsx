import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Send } from 'lucide-react';
import { CATEGORIES, SEVERITY_HINTS } from '@/config/constants';
import { isDemoMode } from '@/services';
import { useSubmitReport } from '@/hooks/useIssues';
import { reverseGeocode } from '@/services/geocoding';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';
import CategoryIcon from '@/components/ui/CategoryIcon';
import PhotoUpload from './PhotoUpload';
import LocationPicker from './LocationPicker';
import NearbyIssues from './NearbyIssues';
import ReportResult from './ReportResult';
import { validateReport } from './validation';

export default function ReportForm() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [severityHint, setSeverityHint] = useState('moderate');
  const [photo, setPhoto] = useState(null);
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const mutation = useSubmitReport();

  const debouncedPosition = useDebouncedValue(position, 700);
  useEffect(() => {
    if (!debouncedPosition) return undefined;
    const controller = new AbortController();
    reverseGeocode(debouncedPosition.lat, debouncedPosition.lng, controller.signal)
      .then((a) => setAddress(a))
      .catch(() => {});
    return () => controller.abort();
  }, [debouncedPosition]);

  const reset = () => {
    setCategory(''); setDescription(''); setSeverityHint('moderate'); setPhoto(null);
    setPosition(null); setAddress(''); setErrors({}); mutation.reset();
  };

  if (mutation.isSuccess) return <ReportResult result={mutation.data} onReset={reset} />;

  const submit = (e) => {
    e.preventDefault();
    const found = validateReport({ category, description, position, photo });
    setErrors(found);
    if (Object.keys(found).length) return;
    mutation.mutate({
      category, description: description.trim(), severityHint, photo,
      lat: position.lat, lng: position.lng, address,
    });
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <fieldset>
        <legend className="field-label">What is the problem?</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CATEGORIES.map((c) => (
            <label key={c.id} className={clsx(
              'flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal',
              category === c.id ? 'border-signal bg-signal-tint text-signal-dark' : 'border-paper-line bg-white hover:border-signal/50',
            )}>
              <input type="radio" name="category" value={c.id} checked={category === c.id}
                onChange={() => setCategory(c.id)} className="sr-only" />
              <CategoryIcon name={c.icon} className="h-6 w-6" />
              <span className="text-sm font-semibold">{c.label}</span>
              <span className="text-xs text-ink-soft">{c.hint}</span>
            </label>
          ))}
        </div>
        {errors.category && <p className="mt-2 text-sm font-medium text-priority-critical">{errors.category}</p>}
      </fieldset>

      <div>
        <span className="field-label">Photo</span>
        <PhotoUpload file={photo} onChange={setPhoto} error={errors.photo} />
      </div>

      <div>
        <span className="field-label">Where is it?</span>
        <LocationPicker value={position} onChange={setPosition} error={errors.position} />
        <div className="mt-3">
          <label htmlFor="address" className="field-label">Address or landmark</label>
          <input id="address" className="field-input" value={address} onChange={(e) => setAddress(e.target.value)}
            placeholder="Filled in from the pin. Edit if it looks wrong." />
        </div>
        <div className="mt-3"><NearbyIssues category={category} position={position} /></div>
      </div>

      <div>
        <label htmlFor="description" className="field-label">What do you see?</label>
        <textarea id="description" rows={4} className="field-input" value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="For example: the hole is about a foot wide and fills with water when it rains." />
        {errors.description && <p className="mt-1 text-sm font-medium text-priority-critical">{errors.description}</p>}
      </div>

      <fieldset>
        <legend className="field-label">How serious does it look?</legend>
        <div className="flex flex-wrap gap-2">
          {SEVERITY_HINTS.map((s) => (
            <label key={s.id} className={clsx(
              'cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal',
              severityHint === s.id ? 'border-signal bg-signal-tint text-signal-dark' : 'border-paper-line bg-white hover:border-signal/50',
            )}>
              <input type="radio" name="severity" value={s.id} checked={severityHint === s.id}
                onChange={() => setSeverityHint(s.id)} className="sr-only" />
              {s.label}
            </label>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-ink-muted">Your answer is one input to the priority score. It cannot set the priority on its own.</p>
      </fieldset>

      {mutation.isError && <ErrorMessage title="Your report was not sent" error={mutation.error} />}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={mutation.isPending || isDemoMode}>
          <Send className="h-4 w-4" aria-hidden="true" />
          {mutation.isPending ? 'Sending report' : 'Send report'}
        </Button>
        {isDemoMode && <p className="text-sm text-ink-soft">Reporting is off until Supabase is connected.</p>}
      </div>
    </form>
  );
}
