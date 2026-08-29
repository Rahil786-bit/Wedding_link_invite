'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { inviteConfig } from '@/lib/invite.config';

interface Guest {
  _id: string;
  slug: string;
  name: string;
  eventKeys: string[];
  createdAt: string;
}

interface GeneratedLink {
  slug: string;
  inviteUrl: string;
  guest: Guest;
}

function buildInviteUrl(slug: string) {
  if (typeof window === 'undefined') return `/invite/${slug}`;
  return `${window.location.origin}/invite/${slug}`;
}

function fillTemplate(body: string, guestName: string, inviteUrl: string) {
  return body.replace(/\{\{guest\}\}/g, guestName).replace(/\{\{link\}\}/g, inviteUrl);
}

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

function MessagePreview({ text }: { text: string }) {
  const parts = text.split(URL_PATTERN);

  return (
    <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
      {parts.map((part, index) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={`${part}-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline break-all text-accent underline underline-offset-2 hover:text-accent-soft"
          >
            {part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'absolute';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
  }
}

export function InviteLinksTab() {
  const [guestName, setGuestName] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [generatedLink, setGeneratedLink] = useState<GeneratedLink | null>(null);
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shareTemplate, setShareTemplate] = useState(inviteConfig.shareMessages[0]?.id || '');
  const [messageDraft, setMessageDraft] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [editingMessage, setEditingMessage] = useState(false);

  const eventsList = inviteConfig.events.items;
  const shareMessages = inviteConfig.shareMessages;
  const activeTemplate = shareMessages.find((m) => m.id === shareTemplate) || shareMessages[0];

  useEffect(() => {
    fetchGuests();
  }, []);

  useEffect(() => {
    if (!generatedLink || !activeTemplate) return;
    setMessageDraft(
      fillTemplate(activeTemplate.body, generatedLink.guest.name, generatedLink.inviteUrl)
    );
    setEditingMessage(false);
  }, [generatedLink, shareTemplate]);

  const fetchGuests = async () => {
    try {
      const response = await fetch('/api/admin/guests');
      if (!response.ok) throw new Error('Failed to fetch guests');
      const data = await response.json();
      setAllGuests(data.guests || []);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const toggleEvent = (eventKey: string) => {
    const next = new Set(selectedEvents);
    if (next.has(eventKey)) next.delete(eventKey);
    else next.add(eventKey);
    setSelectedEvents(next);
  };

  const generateLink = async () => {
    if (!guestName || selectedEvents.size === 0) {
      alert('Please enter a guest name and select at least one event');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName,
          eventKeys: Array.from(selectedEvents),
        }),
      });

      if (!response.ok) throw new Error('Failed to generate link');

      const data = await response.json();
      setGeneratedLink({
        slug: data.slug,
        inviteUrl: buildInviteUrl(data.slug),
        guest: data.guest,
      });

      setGuestName('');
      setSelectedEvents(new Set());
      await fetchGuests();
    } catch (error) {
      console.error('Error generating link:', error);
      alert('Failed to generate invite link');
    } finally {
      setIsLoading(false);
    }
  };

  const copyUrl = async () => {
    if (!generatedLink) return;
    await copyText(generatedLink.inviteUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const copyMessage = async () => {
    if (!messageDraft.trim()) return;
    await copyText(messageDraft);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(messageDraft);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const composeForGuest = (guest: Guest) => {
    setGeneratedLink({
      slug: guest.slug,
      inviteUrl: buildInviteUrl(guest.slug),
      guest,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eventSummary = () => {
    if (selectedEvents.size === eventsList.length) return 'All Events';
    return Array.from(selectedEvents)
      .map((key) => eventsList.find((e) => e.key === key)?.title)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="rounded-lg border border-accent-dim bg-background-deep p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="mb-6 font-display text-xl text-accent">Create Invite Link</h3>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-serif text-sm text-accent-soft">Guest Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full rounded-lg border border-accent-dim bg-background px-4 py-3 text-foreground transition-smooth focus:border-accent focus:outline-none"
              placeholder="Enter guest name"
            />
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <label className="block font-serif text-sm text-accent-soft">Select Events</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedEvents(new Set(eventsList.map((e) => e.key)))}
                  className="rounded bg-accent-dim px-3 py-1 text-xs text-ivory transition-smooth hover:bg-accent-deep"
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedEvents(new Set())}
                  className="rounded bg-accent-dim px-3 py-1 text-xs text-ivory transition-smooth hover:bg-accent-deep"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {eventsList.map((event) => (
                <motion.button
                  key={event.key}
                  onClick={() => toggleEvent(event.key)}
                  className={`rounded-lg border-2 p-4 text-left transition-smooth ${
                    selectedEvents.has(event.key)
                      ? 'border-accent bg-accent-dim text-ivory'
                      : 'border-accent-dim bg-background text-foreground hover:border-accent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-serif font-semibold">{event.title}</p>
                  <p className="mt-1 text-xs opacity-75">{event.date}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {guestName && selectedEvents.size > 0 && (
            <motion.div
              className="rounded-lg border border-accent-soft bg-accent-dim/30 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-foreground">
                <span className="font-serif text-accent-soft">Summary:</span> {guestName} will see{' '}
                <span className="font-serif text-accent">{eventSummary()}</span>
              </p>
            </motion.div>
          )}

          <button
            onClick={generateLink}
            disabled={isLoading || !guestName || selectedEvents.size === 0}
            className="w-full rounded-lg bg-accent py-3 font-serif text-background transition-smooth hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate Link'}
          </button>
        </div>
      </motion.div>

      {generatedLink && (
        <AnimatePresence>
          <motion.div
            className="rounded-lg border border-accent-soft bg-background-deep p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="mb-6 font-display text-xl text-accent">Invite Link Generated</h3>

            <div className="mb-8">
              <label className="mb-2 block font-serif text-sm text-accent-soft">Invite Link</label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <a
                  href={generatedLink.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 break-all rounded-lg border border-accent-dim bg-background px-4 py-3 text-sm text-accent underline underline-offset-2 hover:text-accent-soft"
                >
                  {generatedLink.inviteUrl}
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={copyUrl}
                    className="rounded-lg bg-accent-dim px-6 py-3 text-ivory transition-smooth hover:bg-accent"
                  >
                    {copiedUrl ? 'Copied' : 'Copy'}
                  </button>
                  <a
                    href={generatedLink.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-accent px-6 py-3 text-accent transition-smooth hover:bg-accent-dim"
                  >
                    Open page
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-accent-dim bg-background/60 p-6">
              <div className="mb-2 flex items-center gap-2">
                <span aria-hidden>💬</span>
                <h4 className="font-display text-lg text-accent">WhatsApp message</h4>
              </div>
              <p className="mb-4 text-sm text-muted-soft">
                Tweak it if you like, then copy and send. The invitation URL is a real link — click it to open the guest page.
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {shareMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setShareTemplate(msg.id)}
                    className={`rounded-full px-4 py-1.5 font-serif text-sm transition-smooth ${
                      shareTemplate === msg.id
                        ? 'bg-accent-soft text-background'
                        : 'border border-accent-dim text-foreground hover:border-accent'
                    }`}
                  >
                    {msg.label}
                  </button>
                ))}
              </div>

              {editingMessage ? (
                <textarea
                  value={messageDraft}
                  onChange={(e) => setMessageDraft(e.target.value)}
                  rows={14}
                  className="mb-2 w-full resize-y rounded-lg border border-accent-dim bg-background px-4 py-3 font-body text-sm leading-relaxed text-foreground focus:border-accent focus:outline-none"
                />
              ) : (
                <div className="mb-2 rounded-lg border border-accent-dim bg-background px-4 py-3">
                  <MessagePreview text={messageDraft} />
                </div>
              )}
              <button
                type="button"
                onClick={() => setEditingMessage((open) => !open)}
                className="mb-4 text-xs text-accent-soft underline-offset-2 hover:underline"
              >
                {editingMessage ? 'Show clickable preview' : 'Edit message'}
              </button>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={copyMessage}
                  className="flex-1 rounded-lg border border-ivory/40 py-3 font-serif uppercase tracking-wider text-ivory transition-smooth hover:bg-accent hover:text-background"
                >
                  {copiedMessage ? 'Copied — paste in WhatsApp' : 'Copy Message'}
                </button>
                <button
                  onClick={openWhatsApp}
                  className="px-2 py-2 font-serif text-accent-soft underline-offset-4 hover:underline"
                >
                  Open WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {allGuests.length > 0 && (
        <motion.div
          className="rounded-lg border border-accent-dim bg-background-deep p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="mb-6 font-display text-xl text-accent">Generated Links</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-accent-dim">
                  <th className="px-4 py-3 text-left font-serif text-accent-soft">Name</th>
                  <th className="px-4 py-3 text-left font-serif text-accent-soft">Events</th>
                  <th className="px-4 py-3 text-left font-serif text-accent-soft">Created</th>
                  <th className="px-4 py-3 text-center font-serif text-accent-soft">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allGuests.map((guest) => (
                  <tr
                    key={guest._id}
                    className="border-b border-accent-dim transition-smooth hover:bg-accent-dim/20"
                  >
                    <td className="px-4 py-3">
                      <a
                        href={buildInviteUrl(guest.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline underline-offset-2 hover:text-accent-soft"
                      >
                        {guest.name}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-soft">
                      {guest.eventKeys.length === eventsList.length
                        ? 'All Events'
                        : guest.eventKeys
                            .map((k) => eventsList.find((e) => e.key === k)?.title)
                            .join(', ')}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-soft">
                      {new Date(guest.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={() => composeForGuest(guest)}
                          className="text-xs text-accent transition-smooth hover:text-accent-soft"
                        >
                          WhatsApp
                        </button>
                        <a
                          href={buildInviteUrl(guest.slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent transition-smooth hover:text-accent-soft"
                        >
                          Open page
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
