# Button

The tactile, tile-like button. It sits on a 4px press shadow and drops onto it when pressed.

**Variants**
- `dd-btn-primary`: one per screen, for the main step forward (Controleer, Verder, Start les). Delft fill, `on-delft` label, `shadow-press`.
- `dd-btn-secondary`: an alternative that keeps you in the flow (Overslaan, Herhaal woorden). `line-strong` border, `shadow-press-neutral`.
- `dd-btn-ghost`: low-weight help (Uitleg, Terug).
- `disabled`: Controleer before an answer is chosen. Uses the `biscuit` ground. Keep the label so people know what will unlock.

**Consumer provides:** the label (a verb, in Dutch inside lessons and English in settings), `onClick`, and an optional leading icon. Add `dd-btn-block` for full width at the bottom of lesson screens.

**Do:** keep the minimum height at 48px for thumbs. **Don't:** use oranje on a button. Orange is reserved for rewards.
