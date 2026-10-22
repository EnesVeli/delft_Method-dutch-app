# ThemeTile

One theme on the theme map, drawn as a Delft tile whose four corner motifs glaze one by one as mastery grows.

Real Delft wall tiles carry a small ornament in each corner (*hoekmotief*, such as the *ossenkop*). We use those four corners as the mastery scale from `docs/gamification.md`:

| Level | Corners glazed | Look |
|---|---|---|
| Locked | 0 | `biscuit` ground (unglazed clay), lock in the medallion |
| 0 · Not started | 0 | porcelain ground, empty outlined corners |
| 1 · Started | 1 | top-left corner in `delft` |
| 2 · Practiced | 2 | two corners |
| 3 · Solid | 3 | three corners |
| 4 · Mastered | 4 | all corners and the medallion glazed, number in `on-delft` |

Corners fill clockwise from the top left. If mastery decays, a corner goes back to unglazed. Show this gently, never as a failure.

**Consumer provides:** `number`, `name` (the Dutch theme title), `level` (-1 for locked, otherwise 0–4), `isCurrent` (an oranje outline marking where the learner continues), and `href`.

**Accessibility:** the state is always written under the tile (`Solid · 3/4`) and included in the link's accessible name. The empty-corner outline is decorative, so never rely on it alone.

**Don't:** add stars, crowns or badges to tiles. The glaze is the reward.
