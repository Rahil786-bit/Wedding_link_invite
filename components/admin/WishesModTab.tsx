'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Wish {
  _id: string;
  name: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export function WishesModTab() {
  const [pending, setPending] = useState<Wish[]>([]);
  const [approved, setApproved] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'pending' | 'approved'>('pending');

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchWishes = async () => {
    try {
      const pendingRes = await fetch('/api/admin/wishes?status=pending');
      const approvedRes = await fetch('/api/admin/wishes?status=approved');

      if (pendingRes.ok) {
        const data = await pendingRes.json();
        setPending(data.wishes || []);
      }

      if (approvedRes.ok) {
        const data = await approvedRes.json();
        setApproved(data.wishes || []);
      }
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveWish = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/wishes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (response.ok) {
        setPending(pending.filter((w) => w._id !== id));
        await fetchWishes();
      }
    } catch (error) {
      console.error('Error approving wish:', error);
    }
  };

  const rejectWish = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/wishes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (response.ok) {
        setPending(pending.filter((w) => w._id !== id));
      }
    } catch (error) {
      console.error('Error rejecting wish:', error);
    }
  };

  const pendingCount = pending.length;
  const approvedCount = approved.length;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-accent-dim border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-background-deep rounded-lg p-6 border border-accent-dim">
          <p className="text-muted-soft text-sm font-serif mb-2">PENDING REVIEW</p>
          <p className="font-display text-4xl text-accent">{pendingCount}</p>
        </div>
        <div className="bg-background-deep rounded-lg p-6 border border-accent-dim">
          <p className="text-muted-soft text-sm font-serif mb-2">APPROVED</p>
          <p className="font-display text-4xl text-accent">{approvedCount}</p>
        </div>
      </motion.div>

      {/* Sub Tabs */}
      <div className="flex gap-4 border-b border-accent-dim">
        <button
          onClick={() => setActiveSubTab('pending')}
          className={`px-6 py-3 font-serif transition-smooth ${
            activeSubTab === 'pending'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted-soft hover:text-foreground'
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setActiveSubTab('approved')}
          className={`px-6 py-3 font-serif transition-smooth ${
            activeSubTab === 'approved'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted-soft hover:text-foreground'
          }`}
        >
          Approved ({approvedCount})
        </button>
      </div>

      {/* Wishes List */}
      <AnimatePresence mode="wait">
        {activeSubTab === 'pending' ? (
          <motion.div
            key="pending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {pendingCount === 0 ? (
              <div className="text-center py-12 bg-background-deep rounded-lg border border-accent-dim">
                <p className="text-2xl text-muted-faint mb-2">📬</p>
                <h3 className="font-display text-xl text-accent mb-2">No Wishes Waiting</h3>
                <p className="text-muted-soft">Your inbox is all caught up!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((wish) => (
                  <motion.div
                    key={wish._id}
                    className="bg-background-deep rounded-lg p-6 border border-accent-soft"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-serif font-semibold text-accent">{wish.name}</p>
                        <p className="text-muted-soft text-xs">
                          {new Date(wish.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-900/20 border border-yellow-600 text-yellow-300 text-xs rounded">
                        Pending
                      </span>
                    </div>

                    <p className="text-foreground mb-4 leading-relaxed">{wish.message}</p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => approveWish(wish._id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-serif rounded transition-smooth"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectWish(wish._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-serif rounded transition-smooth"
                      >
                        Reject
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="approved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {approvedCount === 0 ? (
              <div className="text-center py-12 bg-background-deep rounded-lg border border-accent-dim">
                <p className="text-2xl text-muted-faint mb-2">💝</p>
                <h3 className="font-display text-xl text-accent mb-2">No Approved Wishes</h3>
                <p className="text-muted-soft">Start approving wishes to see them here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {approved.map((wish) => (
                  <motion.div
                    key={wish._id}
                    className="bg-background-deep rounded-lg p-6 border border-green-600/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-serif font-semibold text-accent">{wish.name}</p>
                        <p className="text-muted-soft text-xs">
                          {new Date(wish.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-900/20 border border-green-600 text-green-300 text-xs rounded">
                        Approved
                      </span>
                    </div>

                    <p className="text-foreground leading-relaxed">{wish.message}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
