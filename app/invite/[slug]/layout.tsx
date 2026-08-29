import type { Metadata } from 'next';
import { inviteConfig } from '@/lib/invite.config';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const title = inviteConfig.site.title;
  const description = inviteConfig.site.description;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Rahil & Ruhi — Nikah Invitation',
    },
  };
}

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
