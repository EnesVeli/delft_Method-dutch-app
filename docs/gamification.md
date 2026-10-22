# Gamification Design

> **Status:** Draft v1 · **Owner:** Enes (PO) · **Design lead:** Claude

Gamification here exists to make **learning** feel rewarding. It does not exist to make the *app* feel addictive. Each mechanic below comes from one of our seven principles, and each one has to pass the **gaming test**:

> *Can a learner max out this mechanic without learning any Dutch?* If yes, the mechanic is broken. Fix it or cut it.

---

## The seven principles

### 1. Competence vs. badge theater
**Problem:** Badges for "logged in 7 days" or "earned 1,000 XP" reward attendance, not ability.
**Rule:** Every visible reward has to map to something the learner can now *do*.

**Mechanics**
- **Theme mastery (0 to 4).** Each theme tile goes *Locked → Started → Practiced → Solid → Mastered*. This is computed from real data: lesson scores, SRS retention of the theme's words, and the theme-check result.
- **Can-do statements instead of badges.** Finishing a theme unlocks a statement in plain language, e.g. *"You can order food and pay at a market."* These are collected on the profile.
- No badges for time, logins or XP totals. Ever.

### 2. Completion drive
**Problem:** People want to finish things they've started (the Zeigarnik effect). Used well, this keeps them going. Used badly, it creates busywork.
**Rule:** Make the *next meaningful step* small and visible.

**Mechanics**
- Each theme has 4 to 6 lessons of 3 to 5 minutes, so a finish line is always close.
- The theme tile fills in (glazes) visibly as mastery grows.
- Nudges are about learning, not counters: *"3 words from Boodschappen are almost mastered. Review now?"*
- Collectible content: each finished theme unlocks a short **mini-story** that uses only words you know.

### 3. Variable reward magnitude
**Problem:** Unpredictable rewards are motivating, but slot-machine design is manipulative.
**Rule:** Base rewards are fixed and predictable. Variability comes from *performance surprises*, never from chance.

**Mechanics**
- Fixed XP per exercise, so effort maps to reward.
- **Performance moments** that depend on skill, not luck: a *perfect run* bonus, a *comeback* (fixing a word you got wrong earlier in the session), a *first try* on a hard word.
- Results screens vary their feedback and highlight what improved. A screen that says "nice, 12 XP" every time gets tuned out.
- No loot boxes, random chests or gacha mechanics.

### 4. The streak trap
**Problem:** Daily streaks drive retention through loss aversion. Lose a 200-day streak and many people quit entirely.
**Rule:** Reward *consistency*, never punish *a missed day*.

**Mechanics**
- **Weekly goal** instead of a daily streak. The learner picks 3, 4, 5 or 7 days a week.
- A **"weeks on track"** counter that only goes up. A missed week resets it quietly, with no failure screen.
- No "you lost your streak!" messages, no guilt notifications, and no paid streak repair.
- Reminders are opt-in, sent once a day at most, and framed positively.

### 5. The S-curve problem
**Problem:** Engagement follows an S-curve. Novelty brings people in, then interest flattens and drops once the mechanics feel stale.
**Rule:** Depth unlocks as the learner progresses, so there's always something new.

**Mechanics**
- **Progressive unlocks** tied to competence:
  - Theme 1: reading, listening, matching
  - Theme 3: speaking (shadowing)
  - Theme 5: dictation and mini-stories
  - Theme 10 (end of A1): timed *Snel!* challenges and the A1 checkpoint
  - A2: free-production exercises (build a sentence from prompts)
- Difficulty adapts: exercises draw more on weak words and less on mastered ones.

### 6. The counter-example
*(PO to confirm interpretation)* For every mechanic we write down **how it could backfire**, using real cases from other apps, before we build it. Examples:
- XP leaderboards in other apps lead people to farm easy lessons. **We have no leaderboards.**
- Hearts or lives systems punish mistakes, which are how you learn. **We don't limit mistakes.**
- Streak freezes sold for money turn anxiety into revenue. **We don't do this.**

Each ticket that touches gamification includes a *Counter-example* section in its spec.

### 7. The PBL fallacy
**Problem:** "Gamification = Points + Badges + Leaderboards" is a shallow pattern. PBL is the *surface* of a game. The *core* of a game is meaningful choices, clear goals, fast feedback, and a mastery curve.
**Rule:** Put the game in the **learning loop**, not on top of it.

**Mechanics**
- **Instant, specific feedback** on every answer, explaining *why* something is wrong (e.g. word order: verb in second position).
- **Meaningful choice:** after each lesson, the learner chooses *Next lesson*, *Review weak words* or *Try the mini-story*.
- **Clear goals:** each lesson opens with what you'll be able to do by the end.
- Points exist (XP), but they aren't the headline. The theme map is.

---

## Systems summary

| System | Visible to learner | Source of truth |
|---|---|---|
| XP | Small counter, weekly total | Sum of exercise rewards |
| Theme mastery 0–4 | Tile glaze on the theme map | Lesson scores + SRS retention + theme check |
| Weekly goal | Ring on the home screen | Days with ≥1 completed lesson or review |
| Weeks on track | Number on the profile | Consecutive weeks where the goal was met |
| Can-do statements | Profile collection | Theme mastery ≥ Solid |
| Mini-stories | Unlocked on the theme tile | Theme completed |

## Mastery formula (v1, to be tuned)

```
themeMastery =
  0  Locked     theme not yet unlocked
  1  Started    ≥1 lesson completed
  2  Practiced  all lessons completed
  3  Solid      Practiced AND theme check ≥ 70% AND ≥ 60% of theme words at SRS stability ≥ 7 days
  4  Mastered   theme check ≥ 90% AND ≥ 85% of theme words at SRS stability ≥ 21 days
```

**Unlocking:** the next theme unlocks when the previous one reaches **Practiced** (all lessons done). This is a single config value, `UNLOCK_NEXT_THEME_AT` in `src/features/progress/config.ts`, so the PO can switch it to `started` after testing with learners.

Mastery can **go down** if words decay. This is honest, and it naturally pulls the learner back to review. The UI shows it gently ("some glaze has faded"), never as a failure.
