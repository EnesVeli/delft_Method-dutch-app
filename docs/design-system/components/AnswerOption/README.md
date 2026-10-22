# AnswerOption

A choice in `listen-choose` and similar exercises. Options are large enough for thumbs and numbered for keyboard play (keys 1–4).

**States**
- idle: `surface-raised`, `line` border, neutral press shadow
- selected: `delft-soft` ground, `delft` border (before Controleer is pressed)
- correct: `correct-soft` and `correct`, a check icon and the word *Goed*
- incorrect: `incorrect-soft` and `incorrect`, a cross icon and the word *Fout*

**Consumer provides:** `label` (text, or an image for picture options), `index` for the key hint, `state`, `onSelect`.

**Accessibility:** the group is a `radiogroup`. Correct and incorrect are told apart by an icon and a word as well as by colour. `correct` and `incorrect` have similar lightness, so colour must never be the only signal.

**Don't:** reveal correct or incorrect before the learner presses Controleer.
