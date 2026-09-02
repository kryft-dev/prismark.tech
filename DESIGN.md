# Prismark design guidelines

How every screen of Prismark is designed. These apply to the prototype in
`packages/design/prismark-dark.html` and to the app once it is built. Where this file
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

| Token  | Value     | Use                                        |
| ------ | --------- | ------------------------------------------ |
| bg     | `#0A0A0A` | app canvas                                 |
| ground | `#000000` | page ground behind frames, inputs          |
| hov    | `#161616` | row hover                                  |
| sel    | `#1F1F1F` | selected nav item                          |
| line   | `#262626` | rules under section headings, sidebar edge |
| line2  | `#333333` | control borders (buttons, inputs, toggles) |
| rule   | `#1A1A1A` | table row rules only                       |
| t1     | `#EDEDED` | primary text                               |
| t2     | `#A1A1A1` | secondary text                             |
| t3     | `#7D7D7D` | timestamps, counts, placeholders           |
| blue   | `#52A8FF` | links, "in review", things you can act on  |
| green  | `#3DD68C` | paid, signed, done, on track               |
| amber  | `#F5A623` | waiting, due soon, visible to the client   |
| red    | `#FF6166` | overdue, expiring, late                    |

Primary button is white on black (`#EDEDED` fill, `#0A0A0A` text). Secondary
is transparent with a `line2` border. Text links are blue.

## Type

- **Geist Sans** for everything people read: prose, headings, labels,
  controls, table text, money, dates, counts.
- **Geist Mono** for timestamps, invoice numbers, issue numbers, emails,
  IBANs, file sizes, IP addresses, keyboard hints. Operational identifiers,
  not prose.
- Scale, and nothing outside it:

| Role       | Size    | Weight  | Notes                  |
| ---------- | ------- | ------- | ---------------------- |
| Page title | 24px    | 600     | letter-spacing -0.02em |
| Section    | 20px    | 600     | rule underneath        |
| Row title  | 16px    | 500     |                        |
| Body       | 15px    | 400     | line-height 1.5        |
| Label, nav | 14px    | 400/500 |                        |
| Meta, mono | 12–13px | 400     | Geist Mono, colour t3  |
| Big number | 28px    | 600     | tabular figures        |

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

## States

Every screen and every control has a defined look for every state it can be in.
Nothing is "just missing" while it loads, fails, or waits. Four rules hold
everywhere:

- **A state is a sentence plus a cue.** The cue is an icon or a word in a
  status colour. Colour never carries the state alone.
- **Layout never jumps.** Whatever stands in for content (skeleton, error,
  empty) takes the same space the content will take, in the same place.
- **What is on screen stays on screen.** A failed refresh, a lost connection,
  or a slow server never blanks out data the person already has.
- **Every dead end has a next step.** A retry, a link, or the reason there is
  nothing to do.

### Control states

Desktop has hover; phones do not. Keyboard focus shows a 2px `t3` ring with
2px offset, on `:focus-visible` only, never removed. Nothing changes size,
moves, or animates between these states.

| Control          | Rest                              | Hover                   | Press                 | Disabled                            |
| ---------------- | --------------------------------- | ----------------------- | --------------------- | ----------------------------------- |
| Primary button   | `t1` fill, `bg` text              | `#FFFFFF` fill          | `#D4D4D4` fill        | `line2` fill, `t3` text             |
| Secondary button | transparent, `line2` border, `t1` | `hov` fill, `t3` border | `sel` fill            | `line` border, `t3` text            |
| Text link        | blue                              | underline               | underline             | `t3`, no underline                  |
| Input, textarea  | `ground` fill, `line2` border     | `t3` border             | as focus: `t1` border | `bg` fill, `line` border, `t3` text |
| Row              | none                              | `hov` fill              | `sel` fill            | title in `t3`, not clickable        |
| Nav item         | `t2` text                         | `t1` text, `hov` fill   | `sel` fill            | `t3` text                           |
| Checkbox, toggle | `line2` border                    | `t3` border             | `sel` fill            | `line` border, `t3` mark            |
| Board card       | `line2` border                    | `t3` border             | lifts while dragging  | `t3` title, no drag                 |

- Disabled controls stay visible and keep their label. When the reason is not
  obvious, a `t2` sentence next to the control gives it: "Only the owner can
  change this." Never a tooltip as the only explanation on a phone.
- Selected is `sel` fill, used for the current nav item, the picked row, the
  active code box. Selection and hover can stack; press wins over both.
- Mobile press feedback is the fill change above, never an opacity fade.

### Loading

- **Under 300ms** show nothing. Most edge responses land here; a flash of
  skeleton is worse than a short wait.
- **First load of a page** after 300ms: a skeleton with the exact geometry of
  the content (row height, column widths, avatar circles) in `hov`, static.
  No shimmer. The header and sidebar render immediately with real text.
- **Refresh of a page that has content**: keep the content, no skeleton. If a
  refresh takes over 2s, a `t3` sentence under the header: "Updating".
- **An action** (button press that writes): the button keeps its label, gains
  a spinner in its icon slot, and takes no more clicks. Nothing else on the
  page greys out. The form's inputs stay readable but not editable.
- **Inline lists that load more** (older messages, more activity): one
  spinner row in place of the next row.
- **Over 10s** on any first load: replace the skeleton with the sentence
  "Still loading. Prismark is slower than usual." and a "Try again" link.
- Optimistic writes: a message, a task move, a check, a reaction appear the
  moment they are made and settle when the server agrees. If it disagrees,
  they revert and an error sentence appears where they were.

### Empty

Three different situations, three different treatments:

- **Nothing yet** (first project, first invoice, no channels): the mascot at
  96px, then a one-line sentence saying what will live here, then one primary
  action. "Invoices you send to clients will show up here." "Create the first
  invoice". Centred in the content area, never in a box.
- **Nothing matches** (a filter or search that finds nothing): no mascot. One
  `t2` sentence and a link to undo: "No tasks match these filters." "Clear
  filters".
- **Nothing left** (inbox empty, my work done, no overdue invoices): the
  mascot at 64px and a sentence that says so plainly: "Nothing needs you."
  No action.

Section-level empties inside a page (a project with no files yet) are a
single `t2` sentence in the section's own space: "No files yet." followed by
the action the section header already offers. Never the mascot inside a
section.

### Error

- **A field**: `red` border, and under the field a `red` sentence with an
  alert icon that says what is wrong and what fixes it: "That is not an email
  address." The field keeps its value. Focus moves to the first bad field on
  submit.
- **A form**: above the primary button, one `red` sentence with the icon for
  what the server refused: "Acme already has an invoice numbered 14. Use the
  next number." Inputs keep their values.
- **An action that failed** (send, move, sign, pay): a toast with the alert
  icon, the sentence, and one action, usually "Try again". The thing on
  screen returns to its previous state. Toasts last 6s, pause on hover, can be
  dismissed, and stack at most three.
- **A page that could not load**: in the content area, at the top, a sentence
  with the icon and a "Try again" link. Header and sidebar stay. "Couldn't
  load this project's tasks." If part of a page loads and part does not, the
  failed part shows its own sentence in its own place; the rest works.
- Error copy names what happened and the next step, never "something went
  wrong", never an apology, never a code. Codes go in a `t3` mono line under
  the sentence only when support would need them.

### Warning

Amber, with a clock or an eye, always a word: "waiting on Acme", "due
tomorrow", "Acme sees this", "expires Fri". A warning never blocks and never
needs dismissing. It sits in the status sentence of the thing it is about, not
in a banner. The only page-wide amber is the client-visibility eye on a
channel, because forgetting who is reading is the one mistake worth
interrupting for.

### Server did not respond

Timeouts and 5xx are the same state to the person: Prismark is not answering.

- **Reads** retry once on their own after 2s. If the retry fails, the page
  or section shows "Prismark didn't answer. Try again." with the link, and
  keeps whatever it already had.
- **Writes never retry on their own.** A send, a payment, a signature might
  have gone through. The toast says "Prismark didn't confirm this. Check
  before trying again." with a link to the thing, and "Try again". Drafts and
  typed values are kept.
- **If it persists** past 30s across requests, one `t2` line under the
  header of every page, no box: "Prismark is having trouble. Your changes are
  kept here until it is back." It goes away by itself when a request
  succeeds.

### No internet

The device says it is offline (`navigator.onLine`, NetInfo), or every request
fails to connect.

- One `t2` line under the header: "You're offline. You can read, and changes
  will wait." with a wifi-off icon. It disappears on reconnect, replaced for
  3s by "Back online" in `green`.
- Everything loaded stays readable and navigable. Pages never loaded show
  "This needs a connection." in their content area.
- Write controls are disabled, with the reason the line already gives, so
  they need no extra sentence. Text already typed is never lost.
- Chat is the exception: a message can be composed and sent offline. It shows
  in the channel with a `t3` "waiting to send" under it and goes out, in
  order, on reconnect. Nothing else queues.

### Success

- The result shows where the thing is. The status word turns `green` with a
  check, in place: "paid", "sent", "signed", "done". No modal, no page of
  celebration, no motion beyond the word changing.
- A toast only when the result is somewhere else: "Invoice 14 sent to Acme."
  with "View". Toasts for success last 4s and carry at most one action.
- Creating something goes to it. Creating a project opens the project.
  Sending a code goes to the code screen.
- Undo, where it is cheap and the action is not external, lives in the toast:
  "Task moved to Done." "Undo". Sending an invoice, a code, or a document is
  external and has no undo; those confirm before, not after.

### Partial success

Batch actions (move 5 tasks, delete 3 files, remind 4 clients) can half
work. The half that worked stays worked; the half that did not is named.

- One sentence, the counts inside it: "3 of 5 tasks moved. 2 stayed because
  they are in review." Then the 2 listed by name, each with its own reason,
  and one "Try the 2 again" where a retry could help.
- Never a silent partial. Never rolling back the successes to make the
  message simpler.

### The rest

- **Not allowed** (403): the page shows "You can't see this. Ask an owner or
  admin." with a link to People. Controls a person cannot use are disabled,
  not hidden, unless the whole feature is outside their role (clients never
  see a Tasks nav item).
- **Not found** (404, or deleted since the link was made): "This
  {thing} doesn't exist any more, or you can't see it." and a link to the
  list it would be in.
- **Signed out** (session expired mid-use): the sign-in screen with the
  sentence "Your session ended. Sign in again to continue." The draft that
  was being typed is restored after sign-in.
- **Someone else changed it** (edit conflict): the sentence "Dana changed
  this while you were editing." with "See their version" and "Keep mine".
  Never a silent overwrite.
- **Destructive** (void an invoice, remove a person, delete a file): an alert
  dialog whose title is the outcome and whose button names it: "Void invoice
  14?" "Void it". Never "Are you sure?", never a red button unless the action
  is unrecoverable.
- **Unsaved changes** when leaving: only for long text (a document
  description, a message with more than a line). Everything else saves as it
  goes.
- **Long-running** (export, import, bulk send): a `t2` line with the count
  moving: "Sending 12 of 40." The person can leave; a toast tells them when
  it is done.
- **Read-only** (client portal, done tasks, void invoices): no edit
  affordances at all, rather than disabled ones. The status sentence says why
  when it is not obvious: "Void. Cloned as invoice 15."
- **Overflow**: text truncates with an ellipsis only in rows and cards, and
  the full text is one hover or press away. Prose never truncates.
- **Slow network** is loading, above. There is no separate "slow" state.

## Copy

- Write from the person's side: "Acme has not signed the statement of work
  yet. You sent it 3 days ago to Dana Whitfield."
- Active voice, sentence case, no internal vocabulary. "People", not "Users".
  "How Musa is paid", not "Compensation rules".
- Counts and money go in the sentence, not in a badge, except unread counts.
- Errors say what went wrong and what to do next. No apologies.
