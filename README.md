# NichePost AI 🚀

Automate your niche social presence using Groq AI and email reminders. No social API keys required.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **AI Engine:** Groq (Llama-3-70b)
- **Email:** Resend
- **Database:** Supabase
- **Styling:** Tailwind CSS + Framer Motion (Glassmorphism / Neon Cipher)

## Getting Started

### 1. Supabase Setup
- Create a new project on [Supabase](https://supabase.com).
- Run the SQL migration found in `src/lib/schema.sql` in the Supabase SQL Editor.

### 2. Environment Variables
Create a `.env.local` file in the root directory and fill in your API keys:

```env
# Groq (AI generation)
GROQ_API_KEY=

# Resend (email reminders)
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev

# Supabase (database)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

## Features
- **Onboarding Wizard:** 3-step setup for niche, schedule, and email.
- **AI Post Generator:** Tailored content for Twitter, LinkedIn, Reddit, Telegram, Facebook, and WhatsApp.
- **Post to All:** One-click deployment via platform share URLs.
- **Analytics:** Visual performance tracking and streak counts.
- **Email System:** Automated reminders via Resend + Vercel Cron.

## Project Structure
- `src/app/`: Next.js App Router pages.
- `src/components/`: Reusable UI components.
- `src/lib/`: Core logic, API clients, and database schema.
- `src/app/api/`: Backend endpoints for AI generation, emails, and cron.
