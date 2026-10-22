# WeeklyGoalRing

The weekly goal from `docs/gamification.md`. It's a ring split into one segment per goal day, and each segment fills in `oranje` when that day is done.

**Consumer provides:** `goalDays` (3, 4, 5 or 7), `doneDays`, `weeksOnTrack`.

**Rules**
- Use segments, not a smooth percentage. Each segment is a real day the learner showed up.
- Copy stays positive: *Bijna!*, *Week gehaald!*. Never "you missed", never a countdown.
- A missed week resets `weeksOnTrack` quietly, and the ring simply starts empty on Monday.
- The ring is `role="img"` with an `aria-label` that states days done and the goal.
