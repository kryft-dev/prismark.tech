# Prismark design guidelines

How every screen of Prismark is designed. These apply to the prototype in
`design/prismark-dark.html` and to the app once it is built. Where this file
is silent, follow the Vercel design guide (https://vercel.com/design.md).

## Principles

- **The page is one continuous canvas.** Earn a border or a surface only when
  it communicates selection, interaction, warning or a real grouping that
  spacing cannot express.
- **Spacing before borders. Typography before boxes.** Hierarchy comes from
  size, weight, colour of text and the gap between things, in that order.
- **Design in monochrome.** Colour appears only for state or action, and is
  always paired with a non-colour cue (an icon, a word) so it never carries
  meaning alone.
- **Sentences, not cells.** Anything a person reads is written as a sentence
  about what happened and what they can do. "Acme paid invoice 14, $12,000."
  Buttons name the outcome: "Send reminder", not "Share".
- **Default to stillness.** No motion unless it explains a state change or
  confirms an action. Respect `prefers-reduced-motion`.
- **Real content only.** No lorem ipsum, no placeholder avatars, no fake
  screenshots. Prototype data uses real names, real amounts, real dates.

## Never

- **No cards.** No box with a border, fill, radius and shadow wrapped around a
  list item, metric, section or comparison. No nested panels. If you reach for
  a card, the hierarchy is not decided yet.
- No chips or pills for status. Status is a coloured word with a small icon.
  The only pill is an unread count.
- No all-caps eyebrows, tracked overlines, kickers or decorative section
  numbers. Section labels are sentence case.
- No decorative gradients, glows, blobs, textures, glass, coloured side rails
  or ornamental shadows.
- No em dashes in headings or interface copy.
- No tiny grey copy to make density fit. Body stays 15px.
- No page tabs. Sub-pages of a section are items in the sidebar group.
- No detail side panels. Detail is a full page with a back link, same on
  mobile.
- No centred hero, no metric boxes in a grid, no theme switcher.
- No password fields, no OAuth buttons, no sign-up link. Ever.

## Colour

Single dark theme. Painted explicitly, never inherited.

| Token   | Value     | Use                                            |
|---------|-----------|------------------------------------------------|
| bg      | `#0A0A0A` | app canvas                                     |
| ground  | `#000000` | page ground behind frames, inputs              |
| hov     | `#161616` | row hover                                      |
| sel     | `#1F1F1F` | selected nav item                              |
| line    | `#262626` | rules under section headings, sidebar edge     |
| line2   | `#333333` | control borders (buttons, inputs, toggles)     |
| rule    | `#1A1A1A` | table row rules only                           |
| t1      | `#EDEDED` | primary text                                   |
| t2      | `#A1A1A1` | secondary text                                 |
| t3      | `#7D7D7D` | timestamps, counts, placeholders               |
| blue    | `#52A8FF` | links, "in review", things you can act on      |
| green   | `#3DD68C` | paid, signed, done, on track                   |
| amber   | `#F5A623` | waiting, due soon, visible to the client       |
| red     | `#FF6166` | overdue, expiring, late                        |

Primary button is white on black (`#EDEDED` fill, `#0A0A0A` text). Secondary
is transparent with a `line2` border. Text links are blue.

## Type

- **Geist Sans** for everything people read: prose, headings, labels,
  controls, table text, money, dates, counts.
- **Geist Mono** for timestamps, invoice numbers, issue numbers, emails,
  IBANs, file sizes, IP addresses, keyboard hints. Operational identifiers,
  not prose.
- Scale, and nothing outside it:

| Role          | Size | Weight | Notes                              |
|---------------|------|--------|------------------------------------|
| Page title    | 24px | 600    | letter-spacing -0.02em             |
| Section       | 20px | 600    | rule underneath                    |
| Row title     | 16px | 500    |                                    |
| Body          | 15px | 400    | line-height 1.5                    |
| Label, nav    | 14px | 400/500|                                    |
| Meta, mono    | 12–13px | 400 | Geist Mono, colour t3              |
| Big number    | 28px | 600    | tabular figures                    |

- Numbers always use `font-variant-numeric: tabular-nums` and right-align.
- Prose lines stay near 60–70 characters. Feed sentences may go to 86ch.
- Headings use `text-wrap: balance`.

## Layout

- Desktop frame is 1440 × 900. Sidebar 240px. Page padding 40px top,
  56px sides. Content fills the width; use two columns (main 1.4 : side 1)
  when there is a natural main/detail split. Never leave a large empty
  rectangle.
- Mobile frame is 390 × 844. Page padding 20px. Bottom tab bar with five
  tabs for the team (Inbox, Chat, My work, Projects, More) and four for
  clients (Project, Messages, Invoices, Documents).
- Radius: 6px on controls and rows, 7px on company avatars, 8px on compose
  and code boxes, 10px on the palette. Nothing larger except phone frames.
- Spacing rhythm: 8px within a row, 12–16px between rows, 36–44px before a
  section heading, 64px between columns.

## Tasks

- A task is a piece of work on a person, a project, or both. Project is the
  spine; a task with no project is allowed.
- Visibility is one rule. A task with a project is visible to that project's
  team. A task without a project is visible only to the people on it and
  whoever created it. Clients never see tasks, only milestones.
- Three views, one board: Tasks → Board (everything you can see), Project →
  Tasks (one project, milestone as label and filter), Tasks → My work (only
  what is on you, grouped by project, then "Not in a project", then the
  pool). List view is one click from every board.
- Dragging to Done on a synced project closes the GitHub issue.

## Patterns

- **Sidebar groups.** Inbox, Tasks, Projects, Clients, Money, Team, then
  Channels, Direct, and Settings in the footer. Tasks expands to My work,
  Board, Open to anyone, Done. A group expands only when it
  is on the active path. A project expands to Overview, Tasks, Chat, Chat
  with {client}, Files, Invoices, Documents, People. Client channels carry an
  amber eye.
- **Header.** Optional crumb in t2, title, one status sentence in t2, actions
  right-aligned. The status sentence starts with the status word and cue.
- **Feed with a spine.** Inbox, activity, history and trails: a 1px vertical
  line through 28px avatars, one sentence per item, meta line under it,
  time and one button on the right.
- **Plain rows.** Lists are rows with 12px vertical padding, title at 16px
  medium, context in t2, numbers and owner and age lined up on the right.
  Hover fills the row with `hov`. No borders between rows.
- **Indented tree.** Tasks under milestones, files under folders, people
  under companies: children indent 28px with a circle checkbox. Done items
  fade to t3, never struck through.
- **Label and value.** Small money summaries use a two-column grid, label in
  t2, value right-aligned and tabular. A sum row has a rule above it.
- **Boards.** The main way to look at tasks and deals. Columns are status
  (To do, Doing, In review, Done) or pipeline stage (Lead, Contacted,
  Proposal, Won, Lost). Column heading carries a count, and a value for
  deals. The card is the one place a bordered box is fine, because the box
  is what you drag: title, one line of context (project and milestone, or
  deal and value), then owner avatar, due word and identifier in mono.
  A status word appears on a card only when something is wrong. Filters and
  the Board/List switch sit in one row above the columns. On a phone a board
  is one column at a time with a stage picker across the top.
- **Tables** only where every column is a number or a date: invoices,
  ledger, by-project money. Left-align text, right-align numbers, header
  aligned the same way as its column.
- **Status words.** `paid`, `signed`, `on track` green with a check;
  `waiting on Acme`, `due tomorrow`, `Acme sees this` amber with a clock or
  eye; `6 days overdue`, `expires Fri` red with an alert; `in review` blue
  with an eye; neutral timing in t3.
- **Stat strip.** Big numbers sit in a row with a label above and a detail
  line below. No boxes around them. Lead with them only on Money and
  earnings pages.
- **Settings rows.** Title, one-line description, control on the right
  (toggle, link or small button). No borders between rows.
- **Client portal.** Same components, fewer of them. Workspace name with a
  "for {company}" line. Clients see milestones, the shared channel, shared
  files, invoices and documents. Never tasks, internal chat or the ledger.

## Copy

- Write from the person's side: "Acme has not signed the statement of work
  yet. You sent it 3 days ago to Dana Whitfield."
- Active voice, sentence case, no internal vocabulary. "People", not "Users".
  "How Musa is paid", not "Compensation rules".
- Counts and money go in the sentence, not in a badge, except unread counts.
- Errors say what went wrong and what to do next. No apologies.
