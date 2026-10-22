# LessonBar

The top of every lesson: a close button, one segment per exercise, and XP earned so far.

**Segments:** `done` (delft), `missed` (delft at reduced strength: answered wrong first, then got right later), `now` (outlined), and upcoming (`biscuit`). Segments make the finish line countable in a way a smooth bar doesn't, which feeds the completion drive.

**Consumer provides:** `total`, `results[]`, `currentIndex`, `xp`, `onClose`.

**Rules:** closing asks once for confirmation and keeps progress inside the lesson for 24 hours. The XP pill is the only oranje on a lesson screen until the results.
