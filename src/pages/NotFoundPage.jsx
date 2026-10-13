import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <EmptyState title="Page not found" action={<Button to="/">Go home</Button>}>
        The page you are looking for does not exist.
      </EmptyState>
    </div>
  );
}
