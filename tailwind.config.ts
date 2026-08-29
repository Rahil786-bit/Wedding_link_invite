import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-deep': 'var(--color-background-deep)',
        foreground: 'var(--color-foreground)',
        ivory: 'var(--color-ivory)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        'accent-deep': 'var(--color-accent-deep)',
        'accent-dim': 'var(--color-accent-dim)',
        'accent-alt': 'var(--color-accent-alt)',
        muted: 'var(--color-muted)',
        'muted-soft': 'var(--color-muted-soft)',
        'muted-faint': 'var(--color-muted-faint)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        serif: 'var(--font-serif)',
        body: 'var(--font-body)',
        script: 'var(--font-script)',
      },
    },
  },
  plugins: [],
}
export default config
