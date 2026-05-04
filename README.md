# BookSpace

**This repository is an exam project** (coursework submission). It is not a commercial product or a maintained open-source library; scope and quality reflect academic requirements and time limits for the assignment.

BookSpace is a full-stack web application for discovering books, managing reading progress, and personalizing recommendations through a multi-step onboarding flow. Users can sign up, browse curated lists (popular, recommended, short reads, epic journeys), search with filters, open book and author pages, leave reviews, and bookmark titles.

## Design attribution

The **UI and visual design** are credited to **Aleksandra Ciesla** and **Diana Boiko**. Implementation follows that design within this codebase.

## Tech stack

- **Framework:** [React Router](https://reactrouter.com/) v7 (full-stack, SSR-capable)
- **UI:** React 19, Tailwind CSS v4, Radix UI (dropdown), Embla Carousel
- **Data:** MongoDB with Mongoose
- **Auth:** `remix-auth` with form strategy, bcrypt password hashing, session cookies
- **Quality:** TypeScript, Vitest (unit/integration), Playwright (e2e)

## Prerequisites

- Node.js (LTS recommended)
- A MongoDB deployment (local or Atlas) and a connection string

## Environment variables

Copy `.env.example` to `.env` and set:

| Variable        | Purpose                          |
|-----------------|----------------------------------|
| `MONGODB_URL`   | MongoDB connection URI           |
| `COOKIE_SECRET` | Secret used for signing cookies |

## Setup and scripts

```bash
npm install
npm run dev
```

The dev server is served by Vite (default URL is typically `http://localhost:5173`).

| Command            | Description                                      |
|--------------------|--------------------------------------------------|
| `npm run dev`      | Development server with HMR                      |
| `npm run build`    | Production build                                 |
| `npm run start`    | Run the production server from `./build`         |
| `npm run typecheck`| React Router typegen + TypeScript check          |
| `npm test`         | Vitest test suite                                |

End-to-end tests use Playwright; configuration lives in `playwright.config.ts`.

## Database seeding

JSON seed data lives under `app/db/seedingData/`. A `seedDatabase` routine exists in `app/db/scripts/seedDatabase.server.ts` and can be wired in (for example from `app/entry.server.tsx`) when you need a fresh populated database for local development or demos.

## License and use

Exam / educational use. Third-party libraries remain under their respective licenses.
