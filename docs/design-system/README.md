Delft Dutch is a free web app for learning Dutch from A0 to A2. The design comes from Delft blue tiles: porcelain-white ground, cobalt blue, and four corner ornaments that glaze as you master a theme. It should feel calm, tactile and a little playful, like a well-made Dutch object, not a slot machine.

## Content fundamentals

- **Two languages, clear roles.** Dutch is the subject: exercise prompts, buttons inside lessons (*Controleer*, *Verder*, *Begrepen*), praise (*Goed zo!*). English is the support language: explanations, hints, settings, errors. Never mix the two inside one sentence.
- **Address the learner as *you*** (English) and *je* (Dutch). Friendly, never childish.
- **Sentence case** everywhere. Uppercase only in the `label` style for short eyebrows (*THEMA 2*).
- **Explain why, in one sentence.** "The verb goes in second place" is better than "Incorrect word order".
- **No guilt, no hype.** No "Don't lose your streak!", no exclamation stacks, no emoji in the UI. One exclamation mark is fine in praise.
- **Nouns always come with their article:** *de markt*, *het huis*.

## Color

- Ground every screen in `surface`. Cards, sheets and options sit on `surface-raised`.
- Text is `ink`; translations and metadata are `ink-muted`. Dutch lesson text is always `ink`, never muted.
- `delft` is the one brand hue: primary buttons, links, glazed tile corners, selection. Text on a delft fill is `on-delft`.
- `biscuit` is unglazed clay. Use it only for things not yet earned: locked tiles, empty progress segments, disabled buttons.
- `oranje` is for **rewards only**: XP, the weekly-goal ring, the current-tile marker. Never put it on a button, an error or a link. Reward numbers as text use `oranje-text`.
- Feedback uses `correct` and `incorrect` on their `-soft` grounds. They are close in lightness, so **always** pair them with an icon and a word (*Goed*, *Fout*, *Niet helemaal*).
- Focus is a 2px solid `focus` ring (alias of `delft`) with a 2px offset, on every interactive element.
- Every text pair in this system meets 4.5:1 in both themes. `line` is decorative; borders that identify a control use `line-strong` (3:1).

## Type

- **Bricolage Grotesque** (`display`) for headlines, theme names and numbers: `display-xl`, `display-lg`, `title`, `stat`. Use it sparingly, one headline per screen.
- **Atkinson Hyperlegible** (`sans`) for everything else. It was designed so that letters like *l/I/1* and *rn/m* can't be confused, which matters when every letter of a new language counts.
- Dutch sentences learners read or tap use `lesson-text` (20/32). UI copy uses `body`, translations `caption`.
- Both are Google Fonts: load `Atkinson+Hyperlegible:wght@400;700` and `Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700`.

## Shape, depth and motion

- Radii: tiles `radius-tile` (almost square, like fired tiles); chips `radius-sm`; buttons, options and cards `radius-md`; sheets `radius-lg` on top corners only.
- Depth is **physical, not floaty**. Pressable things sit on a solid offset shadow (`shadow-press`, `shadow-press-neutral`) and move down onto it when pressed. Only the feedback sheet uses a soft shadow (`shadow-sheet`).
- Spacing follows `space-1` to `space-12`. Page gutter is `space-4` on phones and `space-6` on desktop. Lesson screens are a single column, max 560px wide.
- Motion: 80ms press, 200ms sheet rise, 600ms corner-glaze on the theme map (a fill sweeping in from the corner). Everything respects `prefers-reduced-motion`. No confetti, except one restrained burst for a perfect run.

## The tile, the core visual

The theme map is a grid of `ThemeTile`s, 5 per row on desktop and 3 on phones, like a tiled wall. Mastery levels 1–4 glaze the four corners clockwise from the top left, and *Mastered* glazes the centre medallion too. See `components/ThemeTile`. Tiles never get stars, crowns or badges. The glaze is the reward.

## Iconography

- Line icons, 2–3px stroke, round caps, drawn at 24px on a 24px grid. Use [Lucide](https://lucide.dev) for app chrome (close, speaker, mic, settings).
- Feedback uses only the check and cross shown in `AnswerOption` and `FeedbackSheet`.
- No emoji in the interface. Flag icons are never used to mean a language.

## Building with it (Next.js + Tailwind v4)

Map the tokens once in `src/styles/tokens.css` under `@theme` (`--color-delft: var(--delft)` and so on), and use only those utilities (`bg-surface-raised`, `text-ink-muted`, `shadow-press`). Component class names here (`dd-btn`, `dd-tile`) are the reference look. The React components in `src/components/ui/` should reproduce them exactly, with props as listed in each component's guidelines.
