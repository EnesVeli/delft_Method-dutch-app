# FeedbackSheet

The panel that rises from the bottom after Controleer. It turns every answer into a small lesson.

**Correct:** a headline (*Goed zo!*, *Precies!*, *Top!*), varied so it stays meaningful. XP earned is shown in `oranje-text`, with a primary *Verder* button.

**Incorrect:** the headline *Niet helemaal*, then the correct answer with the key part in bold, then **one sentence explaining why** in plain English. The primary button is *Begrepen*. The exercise comes back later in the session, which is what earns the comeback bonus.

**Consumer provides:** `result`, `correctAnswer`, `explain` (from the content JSON), `xp`, `onContinue`.

**Rules:** announce the sheet with `aria-live="polite"`, move focus to the button, and let Enter continue. Never say "Wrong!", never show sad faces, never take away a life.
