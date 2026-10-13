import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { isDemoMode } from '@/services';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function LoginPage() {
  const { session, isAdmin, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  if (session && isAdmin) return <Navigate to={location.state?.from ?? '/admin'} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signIn(email, password);
      navigate(location.state?.from ?? '/admin', { replace: true });
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <form onSubmit={submit} className="panel space-y-4 p-6">
        <h1 className="text-2xl font-bold">Admin sign in</h1>
        <p className="text-sm text-ink-soft">For authority staff who acknowledge and resolve issues.</p>
        {session && !isAdmin && (
          <div role="alert" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
            This account does not have admin access.{' '}
            <button type="button" className="font-semibold underline" onClick={signOut}>Sign out</button>
          </div>
        )}
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input id="email" type="email" autoComplete="username" required className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password" className="field-label">Password</label>
          <input id="password" type="password" autoComplete="current-password" required className="field-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <ErrorMessage title="Could not sign in" error={error} />}
        <Button type="submit" className="w-full" disabled={busy || isDemoMode}>{busy ? 'Signing in' : 'Sign in'}</Button>
        {isDemoMode && <p className="text-sm text-ink-soft">Sign-in is off until Supabase is connected.</p>}
      </form>
    </div>
  );
}
