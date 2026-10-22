# Delft Dutch

A free, gamified web app for learning Dutch from **A0 to A2**, with short, story-driven lessons about everyday life in the Netherlands.

> **Status:** v2 in development. The v1 prototype is tagged [`v1-legacy`](../../tree/v1-legacy).

## What makes it different

- **20 everyday themes:** introductions, shopping, the doctor, finding work…
- **Progress = competence.** Themes "glaze" like Delft tiles as you actually master them, not as you click.
- **Spaced repetition** (FSRS) for every word you meet.
- **No streak guilt.** Weekly goals instead of daily streaks.
- **Start instantly.** No account needed; sign in later to sync.

## Quick start

**Requirements:** Node 20+, [Supabase CLI](https://supabase.com/docs/guides/cli), Docker (for local Supabase).

```bash
git clone https://github.com/EnesVeli/delft_Method-dutch-app.git
cd delft_Method-dutch-app
npm install
cp .env.example .env.local     # fill in the values printed by `supabase start`
supabase start                 # local Postgres + Auth
npm run dev                    # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright) |
| `npm run lint` / `typecheck` | Code quality checks |
| `npm run content:check` | Validate all lesson content |

## Documentation

| Doc | What's in it |
|---|---|
| [Product vision](docs/product-vision.md) | Who it's for, scope, principles |
| [Gamification](docs/gamification.md) | The 7 principles and the mechanics built on them |
| [Curriculum](docs/curriculum.md) | Themes, lesson anatomy, exercise types, content format |
| [Architecture](docs/architecture.md) | Stack, data model, auth, decisions |
| [Roadmap](docs/roadmap.md) | Milestones and tickets |

## Tech

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Supabase · ts-fsrs · Vitest · Playwright · Vercel

## Content

Lesson themes follow the everyday-topic structure common to NT2 courses. All texts, exercises and audio are original.

## License

TBD
