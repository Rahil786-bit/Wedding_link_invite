# 🚀 Quick Start Guide

Get your wedding invitation site live in 5 minutes!

## Step 1: Install Dependencies
```bash
cd "naushir ahmed"
npm install
```

## Step 2: Set Up Environment Variables

Create `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with:
```env
# MongoDB (free at mongodb.com/cloud/atlas)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/wedding

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-random-string-here

# Admin login
ADMIN_EMAIL=admin@wedding.local
ADMIN_PASSWORD_HASH=a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
# ^ This is SHA256 hash of "123456" — generate yours:
# node -e "console.log(require('crypto').createHash('sha256').update('yourpassword').digest('hex'))"
```

## Step 3: Customize Your Wedding Config

Edit `lib/invite.config.ts`:

```typescript
celebration: {
  primaryName: "Ahmed",
  secondaryName: "Fatima",
  // ... edit other details
}
```

## Step 4: Run Locally
```bash
npm run dev
```

Visit:
- 🌍 Public site: [http://localhost:3000](http://localhost:3000)
- 👥 Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)
  - Email: admin@wedding.local
  - Password: 123456 (or whatever you set)

## Step 5: Deploy to Vercel

1. Push to GitHub:
```bash
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/wedding.git
git push -u origin main
```

2. Go to [vercel.com/new](https://vercel.com/new) and import the repo

3. Add environment variables from `.env.local`

4. Deploy! 🎉

5. Add custom domain in Vercel settings

---

## 📚 More Info

- **Full documentation**: See `README.md`
- **What's built**: See `PROJECT_COMPLETION.md`
- **Troubleshooting**: Check README.md "Troubleshooting" section

## 💡 Common Customizations

### Change colors:
Edit `theme.palette` in `lib/invite.config.ts`

### Add/remove sections:
Comment out components in `app/page.tsx`

### Change fonts:
Edit `theme.fonts.googleFontsUrl` and font family names

### Add more events:
Append to `events.items` (never change existing keys!)

---

**Done! Your wedding invitation site is ready to use.** 💍

For help, see the [README.md](./README.md)
