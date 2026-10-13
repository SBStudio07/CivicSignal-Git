import { Camera, GitMerge, ListOrdered } from 'lucide-react';
import Button from '@/components/ui/Button';
import TopPriorityList from '@/features/dashboard/TopPriorityList';
import { useStats } from '@/hooks/useIssues';

const STEPS = [
  { icon: Camera, title: 'Report with a photo and a pin', text: 'Pick a category, snap the problem, and mark the spot. No account needed.' },
  { icon: GitMerge, title: 'Duplicates merge automatically', text: 'Reports of the same problem nearby are combined into one issue with a running count.' },
  { icon: ListOrdered, title: 'Priority is shown, not hidden', text: 'Every issue gets a score built from four visible parts, so anyone can see why it ranks where it does.' },
];

export default function HomePage() {
  const { stats } = useStats();
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">
            Fifty complaints about one pothole should read as one problem.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            CivicSignal combines duplicate citizen reports into single issues and ranks them with a score anyone can inspect,
            so the most urgent repairs rise to the top.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/report" size="lg">Report an issue</Button>
            <Button to="/map" size="lg" variant="secondary">See the issue map</Button>
          </div>
          {stats && (
            <p className="mt-6 text-sm text-ink-soft">
              {stats.totalReports} {stats.totalReports === 1 ? 'report' : 'reports'} combined into {stats.totalIssues} {stats.totalIssues === 1 ? 'issue' : 'issues'}.
            </p>
          )}
        </div>
        <TopPriorityList limit={4} title="Needs attention right now" />
      </section>

      <section className="border-y border-paper-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-signal-tint text-signal-dark">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-xl font-bold">{title}</h2>
              <p className="mt-1.5 text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
