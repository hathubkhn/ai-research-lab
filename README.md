# Nexus AI Research Lab — Website

A production-ready, full-stack research lab website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL**. Features a premium public-facing site and a complete admin dashboard for managing blog posts, members, and site settings.

---

## ✨ Features

### Public Site
- **Home** — animated hero, research focus, featured projects, publications, lab stats, blog previews, partners, CTA
- **About** — mission, vision, values, team philosophy, interactive timeline
- **Research** — 6 research domain cards, open-source projects, compute infrastructure
- **Projects** — searchable/filterable project grid with status badges
- **Members** — grouped directory with role filtering, member cards, and detail modals
- **Blog** — featured post, tag filtering, search, rich blog detail pages with author blocks
- **Contact** — validated contact form, inquiry type cards, map placeholder

### Admin Dashboard (`/admin`)
- **Secure authentication** via NextAuth v5 / Auth.js with JWT sessions
- **Dashboard overview** — key stats widgets, quick actions, recent content tables
- **Blog management** — create, edit, delete, publish/unpublish, manage tags, SEO fields
- **Rich text editor** — TipTap editor with formatting toolbar, code blocks, links
- **Member management** — create, edit, delete, categorize, manage research interests
- **Settings** — update lab identity, homepage content, contact info, social links

### Design System
- Deep blue / royal blue / cyan palette
- Tailwind CSS with custom design tokens
- Framer Motion animations (hero orbs, scroll reveals, hover effects)
- Dark mode support via `next-themes`
- Fully responsive (mobile, tablet, desktop)
- Animated gradient hero, grid overlays, floating labels

---

## 🏗 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI primitives (custom shadcn-style) |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Rich Text | TipTap |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | Auth.js (NextAuth v5) |
| Icons | Lucide React |
| Notifications | Sonner |
| Font | Geist (next/font) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing routes
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── research/
│   │   ├── projects/
│   │   ├── members/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   └── contact/
│   ├── admin/             # Admin dashboard (protected)
│   │   ├── login/
│   │   ├── blog/
│   │   │   ├── new/
│   │   │   └── [id]/edit/
│   │   ├── members/
│   │   │   ├── new/
│   │   │   └── [id]/edit/
│   │   └── settings/
│   ├── api/auth/[...nextauth]/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/               # Reusable UI primitives
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Homepage sections
│   ├── members/          # Member card & modal
│   ├── blog/             # Blog components
│   ├── admin/            # Admin-specific components
│   └── shared/           # Section heading, badges
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Utility functions
│   └── validations/      # Zod schemas
├── middleware.ts          # Admin route protection
└── types/                # TypeScript types
prisma/
├── schema.prisma          # Database schema
└── seed.ts               # Seed data
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### 1. Clone and install

```bash
git clone <repo-url>
cd ai-research-lab
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/ai_research_lab"

# Auth secret (generate with: openssl rand -base64 32)
AUTH_SECRET="your-secret-key-min-32-chars"
AUTH_URL="http://localhost:3000"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed
```

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔑 Admin Access

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) or `/admin/login`.

| Email | Password |
|---|---|
| `admin@nexusai.lab` | `admin123` |

> **Important:** Change these credentials in production.

---

## 🗄 Database Commands

```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema (no migrations)
npm run db:migrate     # Create and apply migrations
npm run db:seed        # Seed demo data
npm run db:studio      # Open Prisma Studio GUI
```

---

## 📦 Production Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository in Vercel
3. Add environment variables
4. Deploy

### Self-hosted

```bash
npm run build
npm start
```

### Environment variables for production

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="<32+ char secret>"
AUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

---

## 🎨 Customization

### Lab Identity
Update these in `/admin/settings` or directly in `prisma/seed.ts`:
- Lab name and tagline
- Hero section text
- Contact information
- Social media links

### Design Tokens
Edit `tailwind.config.ts` to modify the color palette. The primary blues are defined in the `lab` color scale.

### Adding Pages
1. Create a new directory under `src/app/(public)/`
2. Add `page.tsx` with the route content
3. Add a link in `src/components/layout/navbar.tsx`

### Connecting to Real Database CRUD
The admin forms are currently wired with mock data and `toast` notifications. To connect to the real database:
1. Create server actions in `src/actions/`
2. Replace the `setTimeout` mock in form `onSubmit` handlers with server action calls
3. Use `revalidatePath` to update cached pages

---

## 📝 Seeded Content

The seed script creates:
- **1 admin user** (admin@nexusai.lab / admin123)
- **5 blog posts** (4 published, 1 draft)
- **9 tags** (Research, LLMs, Scaling, etc.)
- **6 members** (PI, Faculty, Senior Researcher, 2 PhD students, 1 Alumni)
- **11 site settings** (lab name, contact, social links, etc.)

---

## 🔧 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run format       # Prettier
npm run db:seed      # Seed database
npm run db:studio    # Prisma Studio
```

---

## 📄 License

MIT — feel free to use this as a template for your research lab website.

---

Built with ❤️ using Next.js, Prisma, and Tailwind CSS.
