# Roadmap

> **Process:** Claude (senior dev / UX) writes the tickets → Enes (PO) approves → Claude Code builds **one ticket = one branch = one PR** → Claude reviews against the spec → Enes merges.

Ticket IDs: `DA-###`. Each ticket follows the template in `CLAUDE.md` (local only, not in git).

---

## M0 · Foundation
*Goal: an empty but production-grade skeleton.*

| ID | Ticket | Size |
|---|---|---|
| DA-001 | Tag current `main` as `v1-legacy`, create `v2` branch, remove old source, move `docs/_v2-root/README.md` and `CLAUDE.md` to the repo root (keep `@AGENTS.md` import), run `git rm --cached CLAUDE.md AGENTS.md` so they stay local only (already in `.gitignore`) | S |
| DA-002 | Fresh Next.js 16 + TS strict + Tailwind v4, ESLint + Prettier, path aliases | S |
| DA-003 | Vitest + Playwright setup with one passing test each | S |
| DA-004 | GitHub Actions CI: lint, typecheck, test, build | S |
| DA-005 | Supabase local setup, first migration (all tables + RLS), `.env.example` | M |
| DA-006 | Design tokens: port the *Delft Dutch* design system `tokens.json` to `src/styles/tokens.css` + Tailwind `@theme` | M |
| DA-007 | UI primitives from the design system: Button, ThemeTile, WeeklyGoalRing, AnswerOption, FeedbackSheet, WordTile, LessonBar | L |

## M1 · Content pipeline
*Goal: lessons as validated code.*

| ID | Ticket | Size |
|---|---|---|
| DA-010 | Zod content schemas + loader (`src/content`) | M |
| DA-011 | `npm run content:check` validation script, wired into CI | S |
| DA-012 | Theme 1 *Wie ben je?*: full content (words, 4 lessons, check) | M |

## M2 · Lesson player
*Goal: complete a lesson end to end.*

| ID | Ticket | Size |
|---|---|---|
| DA-020 | Lesson player shell: progress bar, next/feedback flow, results screen | M |
| DA-021 | Exercises: `listen-choose`, `match-pairs` | M |
| DA-022 | Exercises: `fill-gap`, `word-order` | M |
| DA-023 | Story reader: tap a word to translate and add to review | M |
| DA-024 | Scoring + XP (pure functions + tests) | S |

## M3 · Accounts & sync
| ID | Ticket | Size |
|---|---|---|
| DA-030 | Anonymous sign-in on first visit, Supabase clients | S |
| DA-031 | Persist lesson progress + activity | M |
| DA-032 | "Save your progress": magic-link and Google `linkIdentity` | M |
| DA-033 | RLS tests (another user cannot read or write your rows) | S |

## M4 · Review (SRS)
| ID | Ticket | Size |
|---|---|---|
| DA-040 | `ts-fsrs` scheduler wrapper + tests | S |
| DA-041 | Daily review queue + review session UI | M |
| DA-042 | Words from lessons auto-enter the queue | S |

## M5 · Gamification
| ID | Ticket | Size |
|---|---|---|
| DA-050 | Theme map (home) with Delft-tile mastery states | L |
| DA-051 | Mastery computation (gamification.md formula) + tests | M |
| DA-052 | Weekly goal ring + "weeks on track" | M |
| DA-053 | Theme check + can-do statements on the profile | M |
| DA-054 | Performance moments on the results screen | S |

## M6 · Speaking & audio
| ID | Ticket | Size |
|---|---|---|
| DA-060 | Audio pipeline: generate MP3s for all words and sentences (script) | M |
| DA-061 | `dictation` exercise | S |
| DA-062 | `speak` exercise with word alignment (fix v1's index-based bug) | M |

## M7 · A1 launch 🚀
| ID | Ticket | Size |
|---|---|---|
| DA-070 | Content: themes 2–10 | XL (one ticket per theme) |
| DA-071 | PWA: installable, offline lessons | M |
| DA-072 | Accessibility audit (WCAG 2.2 AA), keyboard play | M |
| DA-073 | A1 checkpoint | M |
| DA-074 | Landing page + production deploy | M |

## M8 · A2
Themes 11–20, progressive unlocks (*Snel!*, free production), A2 checkpoint.

---

## Definition of Done (every ticket)

- [ ] Acceptance criteria met
- [ ] Typecheck, lint and tests pass in CI
- [ ] New logic has unit tests; new flows have an e2e test
- [ ] Works at 360px width and on desktop, keyboard accessible
- [ ] Docs updated if behaviour or architecture changed
- [ ] PR description links the ticket and includes screenshots for UI work
