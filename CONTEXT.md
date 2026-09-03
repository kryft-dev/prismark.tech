# Prismark

The app a small software agency runs itself on: the work, the conversations, the clients, the money, and a portal where clients see their side of it. One glossary for the whole app until the code has real module boundaries.

## Language

### Access

**Workspace**:
One company using the app. The tenant. Everything else belongs to exactly one workspace.
_Avoid_: company, org, tenant, team (when meaning the tenant)

**User**:
The sign-in identity behind a person. Global, one per email address. Appears in code, never on screen.
_Avoid_: account, profile, login

**Membership**:
A user inside a workspace, with a role. Every "who did it" in the app points at a membership.

**Member**:
Anyone with a membership, whichever role they hold. Clients are members too.
_Avoid_: user (on screen), teammate, seat

**Role**:
What a member can do in a workspace: owner, admin, staff, or client.

**Staff**:
The workspace role for people who do the work. They see the projects and tasks they are on and their own earnings.
_Avoid_: member (as a role), employee

**Client member**:
A member with the client role. Sees the portal only, on behalf of one company.
_Avoid_: client user, customer login

**People**:
The word on screen for members and contacts alike.
_Avoid_: users

**Sign up**:
Creating a new workspace and becoming its first owner. Anyone can do it.
_Avoid_: register, onboarding, create account (an account is created on sign in too)

**Invite**:
A link an existing member sends that brings someone into their workspace with a role. Following it signs the person in, creating their user if needed.
_Avoid_: invitation email, add user, seat

**Sign in**:
Proving who you are, by whichever method the app offers. Nothing about the method is special.
_Avoid_: log in, login, authenticate

**Session**:
A signed-in device. Thirty days, sliding. "Sign out everywhere" ends all of them.

### Clients

**Company**:
An organisation in the CRM. The only thing the word company ever means.
_Avoid_: client (as an entity), customer, account, org

**Client**:
A state a company is in once it has a won deal or a project. Not a separate thing.
_Avoid_: customer

**Contact**:
A person at a company. Becomes a client member when someone invites them to the portal.
_Avoid_: lead, person (in code), stakeholder

**Deal**:
Work being pursued with a company. Moves through stages: lead, contacted, proposal, won, lost. Winning it offers to create the project.
_Avoid_: opportunity, lead (as a noun for the deal), sale

**Pipeline**:
The board of deals by stage.
_Avoid_: funnel, sales board

**Portal**:
The client-facing half of the app: their projects, milestones, the client channel, shared files, invoices, documents. Never tasks, internal chat, or the ledger.
_Avoid_: client dashboard, client area

### Work

**Project**:
The spine of the work. Tasks, channels, milestones, files, invoices, and documents hang off it.

**Internal project**:
A project with no company. The workspace's own work.

**Project role**:
What a member can do on one project: manager, contributor, or viewer. Clients never hold one; their access comes from their company.
_Avoid_: project member (as a role name)

**Milestone**:
What the client sees instead of tasks. A named chunk of a project that can be done and can be billed.
_Avoid_: phase, sprint, epic, deliverable

**Task**:
A piece of work on a person, a project, or both. Numbered per workspace, so it keeps its number when it moves.
_Avoid_: ticket, todo, issue (an issue is the GitHub thing), card

**Subtask**:
A task with a parent task. One level only.
_Avoid_: checklist item

**Status**:
Where a task is on the board: to do, doing, in review, done.
_Avoid_: state, column, stage (stages belong to deals)

**Assignee**:
A member a task is on. A task can have several or none.
_Avoid_: owner (of a task), assigned user

**Reviewer**:
The member who approves a task in review.
_Avoid_: approver

**Open to anyone**:
A task with no assignee. Anyone in the workspace who can see it may claim it.
_Avoid_: pool, unassigned, backlog, up for grabs

**Claim**:
Taking an open-to-anyone task onto yourself.
_Avoid_: pick up, self-assign

**My work**:
Every task a member is an assignee or reviewer on and has not finished.
_Avoid_: my tasks, assigned to me

**Board**:
Tasks or deals as columns of status or stage. The main way to look at either.
_Avoid_: kanban

**Time entry**:
Minutes a member logged against a task or a project on a day. Feeds hourly pay and project cost.
_Avoid_: timesheet, timer (a timer is only the control that creates one), log

### Conversation

**Channel**:
A place people talk. Every project has two: internal, and with the client. General channels anyone can join. Directs between any set of people.
_Avoid_: room, thread (a thread is inside a channel), chat (as a noun for one channel)

**Client channel**:
The project channel the client's people are in. Marked on screen so nobody forgets who is reading.
_Avoid_: shared channel, external channel

**Direct**:
A channel between a chosen set of people with no project.
_Avoid_: DM, private message, group chat

**Message**:
One post in a channel.

**Thread**:
Replies under one message.

**Mention**:
Naming a member in a message or comment. Puts an inbox item in front of them.
_Avoid_: tag, ping

**Comment**:
Discussion on something that is not a channel: a task, a deal, a company, an invoice, a document, an expense.
_Avoid_: note, message (messages live in channels), reply

### Money

**Invoice**:
A request for payment sent to a company. Numbered per workspace. Moves forward only: draft, sent, paid, or void.
_Avoid_: bill

**Void**:
Cancelling a draft or sent invoice. A sent invoice is never edited; it is voided and cloned.
_Avoid_: delete, cancel

**Payment**:
Money in against an invoice, by Stripe or bank transfer. Partial payments are fine.
_Avoid_: transaction, receipt

**Expense**:
Money out to a vendor, optionally on a project.
_Avoid_: cost, purchase, bill

**Ledger**:
The double-entry record under every invoice, payment, expense, and payout, kept in the workspace's base currency.
_Avoid_: books, accounting, general ledger

**Account**:
A line in the chart of accounts: asset, liability, equity, income, or expense. Never a person's account.
_Avoid_: category, bucket

**Journal entry**:
One balanced posting to the ledger. Never edited; a wrong one is reversed by a new one.
_Avoid_: transaction, adjustment (an adjustment is an entry with no source)

**Pay rule**:
How a member earns: salary, commission, project share, or hourly. A member can have several at once.
_Avoid_: compensation, comp plan, contract

**Earning**:
An amount a member is owed under one pay rule, accrued as it happens.
_Avoid_: wage, payslip, salary (a salary is one kind of pay rule)

**Payout**:
A record that money left the workspace to a member, made outside the app.
_Avoid_: payment (payments come in), transfer, payroll run

**Base currency**:
The one currency the ledger is kept in. Everything people see may be in another currency.

### Documents and files

**Document**:
A contract or proposal a client signs in the portal. Frozen as versions; what was signed is a hash of one version.
_Avoid_: file (a file is bytes), agreement, PDF

**Version**:
One frozen upload of a document. Sending a new one resets the signers.
_Avoid_: revision, draft

**Signer**:
A contact asked to sign a document. Signing needs a portal account, so the audit trail names a real user.

**Document event**:
One line of a document's legal audit trail: created, sent, viewed, signed, declined, voided, version added.
_Avoid_: activity (the app-wide log is a different thing)

**File**:
Uploaded bytes and their metadata. Marked internal or client; only client files reach the portal.
_Avoid_: asset, upload, media

**Attachment**:
A file dropped onto a task, comment, message, deal, expense, or document.

### Inbox and history

**Activity**:
One record of something that happened, written once and never changed. The source for the project spine, the inbox, and audit.
_Avoid_: event, history, log entry, notification

**Feed**:
Only the visual pattern that lists activities down a spine. Not a thing that is stored.
_Avoid_: timeline, stream

**Inbox item**:
One thing waiting on one member, born from an activity. Read and done are separate: reading is looking, done is dealt with.
_Avoid_: notification, alert, ping, todo

**Inbox**:
The home screen: every inbox item not yet done, split into what needs you and what is waiting on others.
_Avoid_: notifications, home, dashboard

**Needs you**:
Inbox items that wait on the member reading them.

**Waiting on others**:
Inbox items about things the member started that someone else has to act on.
_Avoid_: pending, blocked
