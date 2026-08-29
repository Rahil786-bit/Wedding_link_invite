import type { Metadata } from 'next';
import { inviteConfig } from '@/lib/invite.config';
import { Providers } from '@/app/providers';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: inviteConfig.site.title,
  description: inviteConfig.site.description,
  openGraph: {
    title: inviteConfig.site.title,
    description: inviteConfig.site.description,
    type: 'website',
    siteName: 'Rahil & Ruhi — Nikah Invitation',
  },
  twitter: {
    card: 'summary_large_image',
    title: inviteConfig.site.title,
    description: inviteConfig.site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const palette = inviteConfig.theme.palette;
  const fonts = inviteConfig.theme.fonts;

  const cssVariables = `
    :root {
      --color-background: ${palette.background};
      --color-background-deep: ${palette.backgroundDeep};
      --color-foreground: ${palette.foreground};
      --color-ivory: ${palette.ivory};
      --color-accent: ${palette.accent};
      --color-accent-soft: ${palette.accentSoft};
      --color-accent-deep: ${palette.accentDeep};
      --color-accent-dim: ${palette.accentDim};
      --color-accent-alt: ${palette.accentAlt};
      --color-muted: ${palette.muted};
      --color-muted-soft: ${palette.mutedSoft};
      --color-muted-faint: ${palette.mutedFaint};
      --color-accent-rgb: ${palette.accentRgb};
      --color-accent-soft-rgb: ${palette.accentSoftRgb};
      --color-accent-alt-rgb: ${palette.accentAltRgb};
      --font-display: ${fonts.display};
      --font-serif: ${fonts.serif};
      --font-body: ${fonts.body};
      --font-script: ${fonts.script};
    }
  `;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${inviteConfig.site.faviconEmoji}</text></svg>`} />
        <link href={fonts.googleFontsUrl} rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body className="bg-background text-foreground font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
