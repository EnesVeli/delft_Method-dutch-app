# WordTile

Dutch words as objects you can touch. Comes in two forms.

**`dd-word`, the tile:** used in `word-order` and `match-pairs`, with a neutral press shadow. `is-placed` keeps the tile's slot (hidden) once it moves to the answer line, so the layout doesn't jump. `is-saved` marks a word that is already in the review deck.

**`dd-word-inline`, the story word:** every word in *Het verhaal* is a button with a dotted underline. Tapping it opens the gloss (`dd-gloss`), which shows the article, the translation and *Add to review*. `is-speaking` follows the audio word by word, and `is-active` marks the word whose gloss is open.

**Consumer provides:** `word`, `wordId` (links to `words.json`), state, `onSelect`.

**Rules:** set lesson text in the `lesson-text` style (20/32). Always show the article with nouns (*de markt*). Tiles can be moved with the keyboard using Enter.
