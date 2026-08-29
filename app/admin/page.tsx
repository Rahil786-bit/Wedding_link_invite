'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { InviteLinksTab } from '@/components/admin/InviteLinksTab';
import { WishesModTab } from '@/components/admin/WishesModTab';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'links' | 'wishes'>('links');

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-accent-dim border-t-accent rounded-full animate-spin"></div>
          <p className="mt-4 text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="bg-background-deep border-b border-accent-dim"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="font-display text-2xl text-accent">
              {inviteConfig.celebration.primaryName} & {inviteConfig.celebration.secondaryName}
            </h1>
            <p className="text-muted-soft text-sm">Admin Panel</p>
          </div>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/admin/login' })}
            className="px-6 py-2 bg-accent-dim text-ivory rounded-lg hover:bg-accent-deep transition-smooth"
          >
            Sign Out
          </button>
        </div>
      </motion.header>

      {/* Tabs */}
      <motion.div
        className="max-w-7xl mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex gap-4 mb-8 border-b border-accent-dim">
          <button
            onClick={() => setActiveTab('links')}
            className={`px-6 py-3 font-serif transition-smooth ${
              activeTab === 'links'
                ? 'text-accent border-b-2 border-accent'
                : 'text-muted-soft hover:text-foreground'
            }`}
          >
            Invite Links
          </button>
          <button
            onClick={() => setActiveTab('wishes')}
            className={`px-6 py-3 font-serif transition-smooth ${
              activeTab === 'wishes'
                ? 'text-accent border-b-2 border-accent'
                : 'text-muted-soft hover:text-foreground'
            }`}
          >
            Wishes Moderation
          </button>
        </div>

        {/* Tab content */}
        {activeTab === 'links' && <InviteLinksTab />}
        {activeTab === 'wishes' && <WishesModTab />}
      </motion.div>
    </div>
  );
}
