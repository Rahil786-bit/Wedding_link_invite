# 💍 Wedding Invitation Platform

A config-driven, multi-tenant wedding invitation website built with Next.js, MongoDB, and Tailwind CSS. One couple, one config file, infinite customization.

## Features

- **🎯 Config-Driven**: Everything from couple names to event details is controlled by a single `invite.config.ts` file
- **👥 Personalized Guest Links**: Each guest receives a unique slug link showing only their invited events
- **💌 Wishes & Guestbook**: Guests can leave messages with optional admin moderation
- **📱 Responsive Design**: Mobile-first design with smooth animations via Framer Motion
- **🔐 Admin Suite**: 
  - Generate personalized invite links
  - Share via WhatsApp with templates
  - Moderate guest wishes
  - View all generated links
- **🕌 Quranic Verses**: Swipeable carousel of duas and Quranic verses
- **⏳ Countdown Timer**: Live countdown to the big day
- **🎨 Beautiful Animations**: Loader, section reveals, marquee ribbon, and more
- **🌍 Multilingual**: Support for Arabic, Urdu, and English text

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js (single admin user)
- **Animation**: Framer Motion
- **Fonts**: Google Fonts (customizable per theme)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or pnpm

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd "naushir ahmed"
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values:
   ```env
   MONGODB_URI=mongodb+srv://...
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ADMIN_EMAIL=admin@wedding.local
   ADMIN_PASSWORD_HASH=your-sha256-hashed-password
   ```

   To generate the password hash:
   ```bash
   node -e "console.log(require('crypto').createHash('sha256').update('your-password').digest('hex'))"
   ```

3. **Configure the wedding details**:
   
   Edit `lib/invite.config.ts` with the couple's information:
   - Names, monogram, and intro
   - Color palette and fonts
   - Events (Mehendi, Baraat, Walima, etc.)
   - Quranic verses
   - Footer messages
   - Wishes configuration

4. **Start development server**:
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

## Usage

### Public Site

- **Generic Link** (`/`): Shows the locked events section, prompting visitors to open their personal link
- **Personal Link** (`/invite/[slug]`): Guest sees only their invited events
- Sections included: Loader, Hero, Letter, Ribbon, Events, Countdown, Verses, Wishes, Footer

### Admin Suite

- **Login**: `/admin/login`
- **Invite Links Tab**:
  - Create guest invitations
  - Select which events they can see
  - Generate and copy unique invite links
  - Share via WhatsApp with templates
  - View all generated links
- **Wishes Tab**:
  - Review pending wishes
  - Approve or reject messages
  - View approved wishes wall

## Project Structure

```
.
├── app/
│   ├── page.tsx                    # Public landing/locked page
│   ├── invite/[slug]/page.tsx      # Guest personalized page
│   ├── admin/
│   │   ├── page.tsx                # Admin dashboard
│   │   └── login/page.tsx          # Login page
│   ├── api/
│   │   ├── wishes/                 # Public wishes submission
│   │   ├── guests/[slug]/          # Guest data resolution
│   │   └── admin/                  # Admin-only endpoints
│   ├── layout.tsx                  # Root layout with CSS variables
│   └── globals.css                 # Global styles
├── components/
│   ├── Loader.tsx
│   ├── Hero.tsx
│   ├── Letter.tsx
│   ├── Ribbon.tsx
│   ├── Events.tsx
│   ├── Countdown.tsx
│   ├── Verses.tsx
│   ├── Wishes.tsx
│   ├── Footer.tsx
│   └── admin/                      # Admin components
├── lib/
│   ├── invite.config.ts            # ⭐ MAIN CONFIG FILE
│   ├── config-types.ts             # TypeScript types
│   ├── db.ts                       # MongoDB connection singleton
│   ├── models.ts                   # Mongoose schemas
│   ├── auth.ts                     # NextAuth configuration
│   └── server/
│       ├── guests.service.ts       # Guest logic
│       └── wishes.service.ts       # Wishes logic
└── ...
```

## Configuration Guide

### Editing `invite.config.ts`

The config file is fully typed. Here's what you can customize:

```typescript
{
  site: {
    title: "Your Wedding Site Title",
    faviconEmoji: "💍",
  },
  celebration: {
    primaryName: "Name 1",
    secondaryName: "Name 2",
    monogram: { left: "N", right: "F" },
    intro: "Welcome message...",
  },
  theme: {
    palette: { /* color hex codes */ },
    fonts: { googleFontsUrl: "...", /* font families */ }
  },
  events: {
    items: [
      {
        key: "baraat",        // ⚠️ Never change existing keys!
        title: "Baraat",
        scriptTitle: "بارات",
        date: "2024-06-15",
        // ... more event details
      },
      // Add more events
    ],
  },
  // ... wishes, verses, countdown, etc.
}
```

**Important**: 
- Event keys (`events.items[].key`) are stable identifiers baked into guest links
- Never rename or reorder existing events — only append new ones
- All text supports Arabic/Urdu characters

## API Endpoints

### Public

- `GET /api/guests/[slug]` - Resolve guest name and allowed events
- `GET /api/wishes?status=approved` - Get approved wishes for the wall
- `POST /api/wishes` - Submit a new wish (rate-limited)

### Admin (requires authentication)

- `POST /api/admin/guests` - Create/update guest with invite URL
- `GET /api/admin/guests` - List all generated links
- `DELETE /api/admin/guests/[id]` - Delete a guest link
- `GET /api/admin/wishes?status=pending|approved|rejected` - Fetch wishes
- `PATCH /api/admin/wishes/[id]` - Approve or reject a wish

## Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/wedding-invitations.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repo
   - Add environment variables from `.env.local`
   - Deploy!

3. **Set up MongoDB Atlas**:
   - Create a cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Get the connection string
   - Add to Vercel environment variables as `MONGODB_URI`

4. **Custom Domain**:
   - Go to Vercel project settings
   - Add your custom domain (e.g., naushir-farah-wedding.com)
   - Update DNS records as instructed

## Customization Tips

### Add More Events

Simply append to `events.items` in `invite.config.ts`:

```typescript
events: {
  items: [
    // ... existing events
    {
      key: "reception",  // unique identifier
      title: "Reception",
      scriptTitle: "ریسیپشن",
      date: "2024-06-17",
      // ... other details
    },
  ],
}
```

### Change Colors

Edit `theme.palette` in `invite.config.ts`. All CSS variables update automatically:

```typescript
theme: {
  palette: {
    background: "#1a0f20",
    accent: "#d4a574",
    // ... more colors
  },
}
```

### Add/Remove Sections

Comment out components in `app/page.tsx` and `app/invite/[slug]/page.tsx`:

```typescript
<Letter />          {/* Uncomment to show */}
{/* <Verses /> */}  {/* Comment to hide */}
```

### Customize Admin Credentials

Add to `.env.local`:

```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD_HASH=your-sha256-hash
```

## Troubleshooting

### MongoDB Connection Error

- Ensure `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist includes your server
- Verify the database name in the connection string

### Styles Not Applying

- CSS variables are injected in `app/layout.tsx`
- If colors don't update, clear `.next` build cache: `rm -rf .next && npm run build`

### Admin Login Not Working

- Regenerate password hash: `node -e "console.log(require('crypto').createHash('sha256').update('password').digest('hex'))"`
- Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` are in `.env.local`

### Wishes Not Appearing

- Check if `wishes.requireApproval` is true (they need admin approval)
- Admin must approve wishes in the Wishes Moderation tab
- Refresh the page to see newly approved wishes

## Performance Optimization

- Images are lazy-loaded with `next/image`
- Countdown uses efficient interval-based updates
- Admin pages use session-based authentication
- MongoDB indexes on `slug` for fast guest lookups

## Security Notes

- Guest data is private (invitation links are noindex)
- Admin auth uses hashed passwords (SHA256, upgrade to bcrypt in production)
- Rate limiting on `/api/wishes` POST to prevent spam
- Input sanitization on wish messages
- XSS protection via React's default escaping

## Support & Contributing

For issues or feature requests, please create an issue on GitHub.

## License

MIT — feel free to use and modify for any wedding!

---

**Built with ❤️ for Naushir & Farah** 💍
