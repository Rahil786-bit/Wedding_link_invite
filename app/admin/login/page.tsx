'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/admin');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-5xl font-serif text-accent mb-4">
            <span>{inviteConfig.celebration.monogram.left}</span>
            <span className="mx-2">♦</span>
            <span>{inviteConfig.celebration.monogram.right}</span>
          </div>
          <h1 className="font-display text-2xl text-accent mb-2">Admin Portal</h1>
          <p className="text-muted-soft">Manage your wedding invitation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-background-deep rounded-lg p-8 border border-accent-dim">
          <h2 className="font-display text-xl text-accent mb-6">Sign In</h2>

          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-200 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-serif text-accent-soft mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-background border border-accent-dim rounded-lg text-foreground focus:outline-none focus:border-accent transition-smooth disabled:opacity-50"
                placeholder="admin@wedding.local"
              />
            </div>

            <div>
              <label className="block text-sm font-serif text-accent-soft mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-background border border-accent-dim rounded-lg text-foreground focus:outline-none focus:border-accent transition-smooth disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-accent text-background font-serif rounded-lg hover:bg-accent-soft transition-smooth disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <p className="text-center text-muted-faint text-xs mt-6">
            Use the credentials provided by the couple
          </p>
        </form>
      </motion.div>
    </div>
  );
}
