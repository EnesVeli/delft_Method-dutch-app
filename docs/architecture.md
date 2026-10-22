# Architecture

> **Status:** Draft v1 · **Tech lead:** Claude · **Approved by:** Enes (PO)

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19, TypeScript strict) | Server components, file routing, Vercel deploys |
| Styling | **Tailwind CSS v4** with design tokens | One source of truth for colors, type and spacing |
| Database & auth | **Supabase** (Postgres + Auth + Row Level Security) | Relational data fits progress and SRS; anonymous auth enables guest mode |
| Validation | **Zod** | Shared schemas for content, API input and forms |
| Spaced repetition | **ts-fsrs** | FSRS is a modern, well-researched scheduler (better than SM-2) |
| Audio | Pre-generated MP3s (v2.1), Web Speech API fallback | Browser TTS quality for nl-NL varies by device |
| Speech recognition | Web Speech API (`nl-NL`) where supported | Free; hidden on unsupported browsers |
| Testing | **Vitest** (unit) + **Playwright** (e2e) | Fast, standard |
| CI | GitHub Actions: lint, typecheck, test, content validation | Nothing merges red |
| Hosting | Vercel + Supabase cloud (free tiers) | Zero ops |

## Key decisions (ADRs)

| # | Decision | Status |
|---|---|---|
| 001 | Clean rewrite on the `v2` branch; v1 tagged `v1-legacy` | Accepted |
| 002 | Content lives in the repo as JSON, not in the DB. **No admin panel.** PRs are the CMS. | Accepted |
| 003 | Supabase with anonymous sign-in for guest mode; link email or Google later without losing progress | Accepted |
| 004 | FSRS via `ts-fsrs` for review scheduling | Accepted |
| 005 | All gamification state is *derived* from learning data where possible (mastery, weekly goal), not stored separately | Accepted |

Each ADR gets its own file in `docs/adr/` (template in `docs/adr/000-template.md`).

## Folder structure

```
.
├── content/                  # lesson content (JSON), see curriculum.md
├── docs/                     # this documentation
├── public/
│   ├── audio/                # pre-generated audio
│   └── img/
├── supabase/
│   ├── migrations/           # SQL migrations (source of truth for the schema)
│   └── seed.sql
├── src/
│   ├── app/                  # routes only: thin, compose features
│   │   ├── (learn)/          # theme map, lesson player, review
│   │   ├── (account)/        # sign-in, profile
│   │   └── layout.tsx
│   ├── features/             # one folder per domain
│   │   ├── lessons/          # player, exercise components, scoring
│   │   ├── review/           # SRS queue, review session
│   │   ├── progress/         # mastery, XP, weekly goal (pure functions)
│   │   └── auth/
│   ├── content/              # content loader + Zod schemas
│   ├── components/ui/        # design-system primitives (Button, Card, Tile…)
│   ├── lib/
│   │   ├── supabase/         # server and browser clients
│   │   └── speech/           # TTS and recognition wrappers
│   └── styles/tokens.css
└── tests/e2e/
```

**Rules:** `app/` never talks to Supabase directly. It calls `features/*`. Pure logic (scoring, mastery, scheduling) lives in plain `.ts` files with unit tests and no React.

## Data model

Only **user data** lives in the database. Content IDs (`theme_id`, `lesson_id`, `word_id`) are strings that reference the JSON content.

```sql
profiles          (id uuid PK → auth.users, display_name, weekly_goal_days int default 4,
                   ui_language text default 'en', created_at)

lesson_progress   (user_id, lesson_id, best_score int, attempts int,
                   completed_at timestamptz, PK(user_id, lesson_id))

theme_checks      (user_id, theme_id, score int, taken_at, PK(user_id, theme_id, taken_at))

review_cards      (user_id, word_id, due timestamptz, stability float, difficulty float,
                   reps int, lapses int, state smallint, last_review timestamptz,
                   PK(user_id, word_id))

review_logs       (id, user_id, word_id, rating smallint, reviewed_at)

activity          (user_id, day date, xp int, lessons int, reviews int, PK(user_id, day))
```

- **RLS on every table:** `user_id = auth.uid()`.
- Theme mastery and weekly-goal status are computed in `features/progress` from these tables (ADR-005).

## Auth flow (guest-first)

1. On the first visit, `supabase.auth.signInAnonymously()` runs silently, so the learner has a real `user_id` straight away.
2. All progress is written to Supabase under that ID. Lessons are also cached offline (PWA).
3. A *"Save your progress"* prompt appears after the first completed theme, not before.
4. The learner links an email (magic link) or Google via `linkIdentity`, keeping the same user ID and all progress.

## Security checklist

- [ ] RLS enabled and tested on every table
- [ ] No service-role key in client code
- [ ] All route handlers and server actions validate input with Zod
- [ ] No admin routes (content goes through PRs)
- [ ] `.env.local` in `.gitignore`; `.env.example` committed

## Environments

| Env | URL | Supabase project |
|---|---|---|
| Local | `localhost:3000` | Local Supabase via the CLI (`supabase start`) |
| Preview | Vercel preview per PR | `dutch-app-dev` |
| Production | TBD domain | `dutch-app-prod` |
