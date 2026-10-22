# Product Vision

> **Status:** Draft v1 · **Owner:** Enes (Product Owner) · **Last updated:** 2026-10-22

## One-liner

A free, gamified web app that takes complete beginners from **A0 to A2 Dutch** through short, story-driven lessons built around everyday life in the Netherlands.

## Who it's for

| Persona | Situation | What they need |
|---|---|---|
| **The newcomer** | Just moved to NL (work, study, partner). Zero Dutch. | Survival Dutch fast: shopping, the doctor, the gemeente, small talk. |
| **The course student** | Taking an NT2 course (e.g. VU-NT2 with Link+). | Extra practice on the same everyday themes, between classes. |
| **The inburgering learner** | Working towards the A2 exam. | Structured path, measurable progress, speaking and listening practice. |

## The problem

- Course books are good at structure but don't give you a daily practice loop.
- Big gamified apps keep you coming back, but they often reward *showing up* more than *learning*: streak anxiety, XP farming on easy lessons, leaderboards that measure grind.
- Most apps teach generic "tourist Dutch", not the Dutch you need to live here.

## Our answer

1. **A real curriculum.** 20 everyday themes from A0 to A2, each with a story, vocabulary, one grammar focus, and practice.
2. **Gamification that tracks competence.** Progress means you can *do* something new in Dutch, not just that you clicked enough. See [gamification.md](./gamification.md).
3. **Low friction.** Open the site and you're in your first lesson within 10 seconds. No account wall.
4. **Spaced repetition built in.** Every word you meet goes into a review queue scheduled by a real memory algorithm.

## Principles (in priority order)

1. **Learning over engagement.** If a mechanic raises time-in-app but not learning, we cut it.
2. **Respect the learner's time.** Lessons take 3 to 5 minutes. No dark patterns, no guilt notifications.
3. **Dutch for living here.** Content is about real situations in the Netherlands.
4. **Accessible to everyone.** Free core, works on cheap phones and slow connections, WCAG 2.2 AA.
5. **Boring tech, clean code.** Small, well-documented, tested. Anyone should be able to contribute.

## In scope (v2)

- 20 themes (A0 to A2), original content, recurring characters (Anna and Tom)
- Lesson player with 6 exercise types (see [curriculum.md](./curriculum.md))
- Spaced-repetition review deck
- Theme map with mastery, weekly goal, XP
- Guest mode with optional account to sync progress
- English as the UI and support language (more languages later)
- Installable PWA with offline lessons

## Out of scope (for now)

- Native iOS and Android apps (the PWA covers it)
- B1 and above
- Social features, leaderboards, friends
- Paid tiers
- AI conversation partner
- KNM (Kennis van de Nederlandse Maatschappij) module

## Success metrics

| Metric | Target | Why |
|---|---|---|
| First-lesson completion | > 70% of new visitors who start one | Onboarding works |
| Week-4 retention | > 20% | People stay without guilt mechanics |
| Review retention rate | ~85 to 90% | The SRS is scheduling well |
| Theme-check pass rate | 60 to 80% | Lessons are neither too easy nor too hard |

## Content note

Lesson themes follow the everyday-topic structure used by NT2 courses such as *Link+* (© Uitgeverij Boom). **All texts, dialogues, exercises and audio in this app are original.** We never copy course material.
