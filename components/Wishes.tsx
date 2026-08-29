'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';
import { SectionOrnament } from '@/components/SectionOrnament';

interface Wish {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

function WishesForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);

  const messageLength = message.length;
  const maxLength = inviteConfig.wishes.maxMessageLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) {
      setToast({
        type: 'error',
        title: inviteConfig.wishes.toasts.errorTitle,
        message: 'Please fill in all fields',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit wish');
      }

      const data = await response.json();

      setToast({
        type: 'success',
        title: inviteConfig.wishes.toasts.successTitle,
        message: data.instant
          ? inviteConfig.wishes.toasts.successMessageInstant
          : inviteConfig.wishes.toasts.successMessage,
      });

      setName('');
      setMessage('');
    } catch (error) {
      setToast({
        type: 'error',
        title: inviteConfig.wishes.toasts.errorTitle,
        message: inviteConfig.wishes.toasts.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="invite-panel rounded-sm p-8 md:p-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="font-script text-accent-soft text-sm mb-2">
        {inviteConfig.wishes.form.kicker.toUpperCase()}
      </p>
      <h3 className="font-display text-3xl text-accent mb-2">
        {inviteConfig.wishes.form.title}
      </h3>
      <p className="text-muted-soft mb-8">{inviteConfig.wishes.form.note}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name input */}
        <div>
          <label className="block text-sm font-serif text-accent-soft mb-2">
            {inviteConfig.wishes.form.nameLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-background border border-accent-dim rounded-lg text-foreground focus:outline-none focus:border-accent transition-smooth disabled:opacity-50"
            placeholder="Your name"
          />
        </div>

        {/* Message input */}
        <div>
          <label className="block text-sm font-serif text-accent-soft mb-2 flex justify-between">
            <span>{inviteConfig.wishes.form.messageLabel}</span>
            <span className={messageLength > maxLength * 0.9 ? 'text-accent-dim' : ''}>
              {messageLength} / {maxLength}
            </span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-background border border-accent-dim rounded-lg text-foreground focus:outline-none focus:border-accent transition-smooth resize-none disabled:opacity-50 h-32"
            placeholder={inviteConfig.wishes.form.idleHint}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !name || !message}
          className="w-full py-3 bg-accent text-background font-serif rounded-lg hover:bg-accent-soft transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? inviteConfig.wishes.form.submittingLabel
            : inviteConfig.wishes.form.submitLabel}
        </button>
      </form>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`mt-6 p-4 rounded-lg ${
              toast.type === 'success'
                ? 'bg-green-900/20 border border-green-500'
                : 'bg-red-900/20 border border-red-500'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="font-serif font-bold text-accent mb-1">{toast.title}</p>
            <p className="text-foreground text-sm">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch('/api/wishes?status=approved');
        if (!response.ok) throw new Error('Failed to fetch wishes');
        const data = await response.json();
        setWishes(data.wishes || []);
      } catch (error) {
        console.error('Error fetching wishes:', error);
        setWishes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishes();
    const interval = setInterval(fetchWishes, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  const isEmpty = !isLoading && wishes.length === 0;

  return (
    <motion.div
      className="invite-panel rounded-sm p-8 md:p-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <p className="font-script text-accent-soft text-sm mb-2">
        {inviteConfig.wishes.wall.title.toUpperCase()}
      </p>
      <h3 className="font-display text-3xl text-accent mb-2">
        {inviteConfig.wishes.wall.title}
      </h3>
      <p className="text-muted-soft mb-8">{inviteConfig.wishes.wall.text}</p>

      {isEmpty ? (
        <div className="text-center py-12">
          <p className="font-script text-2xl text-accent-soft mb-2">
            {inviteConfig.wishes.wall.emptyScript}
          </p>
          <h4 className="font-display text-xl text-accent mb-2">
            {inviteConfig.wishes.wall.emptyTitle}
          </h4>
          <p className="text-muted-soft">{inviteConfig.wishes.wall.emptyText}</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div
                key={wish._id}
                className="bg-background rounded-lg p-4 border-l-4 border-accent-soft"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <p className="font-serif font-semibold text-accent mb-1">{wish.name}</p>
                <p className="text-foreground text-sm">{wish.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export function Wishes() {
  if (!inviteConfig.wishes.enabled) {
    return null;
  }

  return (
    <motion.section
      className="relative px-4 py-20 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8 }}
      id="wishes"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionOrnament label={inviteConfig.wishes.scriptAccent} />
          <h2 className="font-display text-4xl md:text-5xl text-accent mb-4">
            {inviteConfig.wishes.title}
          </h2>
          <p className="text-muted-soft text-lg">{inviteConfig.wishes.text}</p>
        </motion.div>

        {/* Form and Wall */}
        <div className="grid md:grid-cols-2 gap-8">
          <WishesForm />
          <WishesWall />
        </div>
      </div>
    </motion.section>
  );
}
