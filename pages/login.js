import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
// We'll dynamically create the client in the browser at submit time to
// avoid initializing Supabase during Next.js build/server rendering.

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { createClient } = await import('@supabase/supabase-js');
      const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

      const { data, error: authError } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || 'Login failed');
        setLoading(false);
        return;
      }

      // On success, redirect to home (or dashboard)
      router.push('/');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Login — Imperium Motors</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <section className="py-16 px-6 w-full max-w-4xl bg-white shadow-md rounded">
          <h2 className="text-2xl font-semibold mb-4">Login to Imperium Motors</h2>
          <p className="text-gray-600 mb-6">Enter your credentials to access the members portal.</p>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <div>
              <button type="submit" className="px-6 py-2 bg-gold text-black font-semibold rounded" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
