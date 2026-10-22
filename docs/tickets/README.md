# Tickets

One file per ticket. Claude Code implements **one ticket per branch per PR**.

## How to run a ticket in Claude Code

Paste this, changing the number:

```
Read CLAUDE.md, then docs/tickets/DA-001.md and the docs it links.
Implement only that ticket, following the workflow in CLAUDE.md.
If anything in the ticket is unclear or conflicts with the repo, stop and ask me before guessing.
When done, give me the PR description using the PR template.
```

## Order

M0 is sequential. Each ticket assumes the previous one is merged into `v2`.

| Ticket | Title | Depends on |
|---|---|---|
| [DA-001](DA-001.md) | Start the v2 branch | none |
| [DA-002](DA-002.md) | Scaffold Next.js 16 | DA-001 |
| [DA-003](DA-003.md) | Test setup: Vitest + Playwright | DA-002 |
| [DA-004](DA-004.md) | CI pipeline | DA-003 |
| [DA-005](DA-005.md) | Supabase schema + RLS | DA-002 |
| [DA-006](DA-006.md) | Design tokens + fonts | DA-002 |
| [DA-007](DA-007.md) | UI primitives | DA-006, DA-003 |

## Review flow

1. Claude Code opens the PR into `v2`.
2. Paste the PR description (or link) into the planning chat. Claude reviews it against the ticket.
3. Enes merges.
