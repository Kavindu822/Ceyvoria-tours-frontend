# Ceyvoria Tours — Luxury Sri Lanka Travel Website (Next.js 15)

**Discover the Soul of Sri Lanka** · Private & Tailor-Made Journeys

The official frontend application for **Ceyvoria Tours**, built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- **Next.js 15 App Router**: Modern server-rendered and statically generated routes (SSG/SSR).
- **Curated Journeys & Destinations**: 20 signature itineraries, 44 detailed destinations, luxury experiences, and travel styles.
- **Interactive Trip Planner**: Multi-step wizard to curate custom travel requests.
- **Multilingual Support**: Built-in internationalization (English, German, French, Russian, Italian, Spanish, Arabic, Hindi, Mandarin, Japanese).
- **Contact Channels**: Dynamic WhatsApp direct link with QR code, telephone, email concierge.
- **Advance Deposit Checkout**: Integrated Dialog Genie payment gateway sandbox/live mode.
- **SEO & Performance**: OpenGraph metadata, JSON-LD schemas, dynamic sitemap, robots.txt, optimized WebP imagery.
- **Offline Editorial Fallback**: Can run standalone using bundled editorial data or connect to the ASP.NET Core backend API.

---

## 🚀 Quick Start (Local Development)

### 1. Requirements
- [Node.js 20+](https://nodejs.org/)
- npm or pnpm

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/Kavindu822/Ceyvoria-tours-frontend.git
cd Ceyvoria-tours-frontend

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and adjust as needed:

```env
# Core URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5050   # Leave blank to browse in offline/standalone editorial mode

# Branding & Dynamic Contact Info
NEXT_PUBLIC_SITE_NAME=CEYVORIA TOURS
NEXT_PUBLIC_CONTACT_EMAIL=ceyvoriatours@gmail.com
NEXT_PUBLIC_CONTACT_PHONE=+94 76 781 0420
NEXT_PUBLIC_CONTACT_PHONE_RAW=+94767810420
NEXT_PUBLIC_WHATSAPP=+94 76 781 0420
NEXT_PUBLIC_WHATSAPP_RAW=94767810420

# Payment Gateway (Dialog Genie - Optional)
DIALOG_GENIE_ENV=sandbox
DIALOG_GENIE_MERCHANT_ID=GENIE_TEST_MERCHANT
DIALOG_GENIE_APP_ID=GENIE_TEST_APP
DIALOG_GENIE_SECRET_KEY=GENIE_TEST_SECRET
```

---

## 🌐 Deploy to Vercel (1-Click)

1. Import this repository into [Vercel](https://vercel.com).
2. Framework Preset will be automatically detected as **Next.js**.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com` (or your vercel app URL)
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-api-url.com`
4. Click **Deploy**. Vercel will build and assign automatic SSL, edge caching, and preview environments.

---

## 🛠️ Scripts

- `npm run dev` - Starts development server on port 3000
- `npm run build` - Creates optimized production build
- `npm run start` - Starts production server
- `npm run lint` - Runs ESLint checks
