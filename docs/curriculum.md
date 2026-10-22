# Curriculum & Content Model

> **Status:** Draft v1 · **Owner:** Enes (PO) · Grammar mapping still needs validating against the VU-NT2 course order.

## Structure

```
Level (A0–A1, A2)
└── Theme (20 total)          e.g. "2 · Boodschappen doen"
    ├── Lessons (4–6)         3–5 min each
    │   └── Exercises (6–12)
    ├── Theme check           mastery quiz, unlocks the can-do statement
    └── Mini-story            unlocked when the theme is completed
```

## The 20 themes

Themes follow the everyday-topic order of Link+. **All content is original.**

| # | Theme | Can-do (goal) | Grammar focus (draft) | Level |
|---|---|---|---|---|
| 1 | Wie ben je? | Introduce yourself, spell your name, give your phone number | Personal pronouns, *zijn* / *hebben* | A0 |
| 2 | Boodschappen doen | Buy things at a market or supermarket, ask prices | Numbers & prices, *de/het*, plurals | A0 |
| 3 | Hoe gaat het? | Ask how someone is, small talk | Yes/no questions, inversion | A0 |
| 4 | Lekker! | Order food and drinks, say what you like | Present tense of regular verbs | A1 |
| 5 | Dit is mijn huis | Describe your home and rooms | *Er is / er zijn*, prepositions of place | A1 |
| 6 | Hoe reis jij? | Use public transport, ask for directions | Modal verbs (*kunnen, willen, moeten*) | A1 |
| 7 | Naar de dokter | Make an appointment, describe symptoms | Imperative, body vocabulary | A1 |
| 8 | Huis, straat en buurt | Talk about your neighbourhood and neighbours | Adjectives (+ *-e*) | A1 |
| 9 | Waar heb je die laptop gekocht? | Talk about purchases in the past | Perfect tense (regular) | A1 |
| 10 | Is dat wel veilig? | Understand warnings and safety rules | Negation (*niet / geen*) | A1 · **A1 checkpoint** |
| 11 | Wat gaan we doen? | Make plans, holidays and celebrations | Future with *gaan* + infinitive | A2 |
| 12 | Op school | Talk about education and courses | Subordinate clauses (*omdat, als*) | A2 |
| 13 | We gebruiken het iedere dag | Talk about devices and household things | Separable verbs | A2 |
| 14 | We bellen iedere dag! | Make phone calls, leave a message | Polite forms (*zou, kunt u*) | A2 |
| 15 | Buiten de deur | Go out, sports, weather | Reflexive verbs | A2 |
| 16 | Goed geregeld | Deal with the gemeente, forms, letters | Perfect tense (irregular) | A2 |
| 17 | Ik zoek werk | Job ads, applying, interviews | *Dat*-clauses, indirect speech | A2 |
| 18 | De natuur is overal | Nature, environment, the outdoors | Simple past (imperfectum) | A2 |
| 19 | Houd je weleens geld over? | Money, budgets, banking | Comparatives & superlatives | A2 |
| 20 | Waar gaat het over? | News, opinions, discussions | Giving opinions (*ik vind dat…*) | A2 · **A2 checkpoint** |

## Lesson anatomy (each theme)

| # | Lesson | Purpose |
|---|---|---|
| 1 | **Woorden** | Introduce 10–15 core words with audio and images |
| 2 | **Het verhaal** | A dialogue or story with Anna and Tom; tap any word to translate and save it |
| 3 | **Grammatica** | One grammar point, shown in context first, then explained |
| 4 | **Oefenen** | Mixed practice across all exercise types |
| 5 | **Spreken** *(from theme 3)* | Shadowing: listen, repeat, compare |
| ✓ | **Theme check** | 10–15 questions, scored, sets mastery |

## Exercise types

| Type | Key | Skill | Example |
|---|---|---|---|
| Listen & choose | `listen-choose` | Listening | Hear *"appel"*, pick the right picture or word |
| Match pairs | `match-pairs` | Vocabulary | Match 5 Dutch words to their English meanings |
| Fill the gap | `fill-gap` | Grammar | *Ik ___ een broodje.* → *eet* |
| Word order | `word-order` | Syntax (V2, verb-final) | Drag tiles: *Morgen / ik / naar / ga / Utrecht* |
| Dictation | `dictation` | Listening + spelling | Hear a sentence, type it |
| Speak | `speak` | Pronunciation | Say the sentence and get word-level alignment feedback |

## Content rules

- **Vocabulary:** stay within the ~500 most frequent Dutch words for A0–A1, extended per theme for A2.
- **Sentences:** short, mostly present tense until the grammar point introduces something else.
- **Characters:** Anna and Tom appear in every story, with a small recurring cast (neighbour, colleague, doctor).
- **Tone:** realistic NL situations, with light humour.
- **No copying** from Link+ or any other published course.

## Content format

Content lives in the repo as versioned, validated JSON. It is **not** stored in the database. Every lesson change is a reviewable PR.

```
content/
├── themes.json                       # theme list, order, metadata
└── themes/
    └── 02-boodschappen-doen/
        ├── theme.json                # can-do, grammar focus, word list
        ├── words.json                # vocabulary entries
        ├── lessons/
        │   ├── 01-woorden.json
        │   ├── 02-het-verhaal.json
        │   └── ...
        ├── check.json                # theme check
        └── story.json                # mini-story
```

Example `words.json` entry:

```json
{
  "id": "w-appel",
  "nl": "appel",
  "article": "de",
  "plural": "appels",
  "en": "apple",
  "pos": "noun",
  "audio": "/audio/nl/appel.mp3",
  "image": "/img/words/appel.webp"
}
```

Example exercise:

```json
{
  "id": "02-04-ex07",
  "type": "word-order",
  "prompt": { "en": "Tomorrow I'm going to the market." },
  "tiles": ["Morgen", "ga", "ik", "naar", "de", "markt"],
  "answer": ["Morgen", "ga", "ik", "naar", "de", "markt"],
  "explain": "Dutch main clauses put the verb in second position. 'Morgen' is first, so 'ga' comes before 'ik'.",
  "wordIds": ["w-morgen", "w-gaan", "w-markt"]
}
```

All content is validated by **Zod schemas** in `src/content/schema.ts`. CI fails if any file is invalid or references an unknown `wordId`.
