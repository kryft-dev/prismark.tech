# Projects

The project is the spine. Tasks, channels, milestones, files, invoices, and documents hang off it. A project may have no client company, that is an internal project.

## project

| Column       | Type    | Rule     | Notes                                                     |
| ------------ | ------- | -------- | --------------------------------------------------------- |
| id           | text    | required |                                                           |
| workspace_id | text    | required |                                                           |
| name         | text    | required |                                                           |
| company_id   | text    | optional | client; empty for internal projects                       |
| deal_id      | text    | later    | the Won deal this came from, at most one project per deal |
| status       | text    | required | `active`, `paused`, `done`, `archived`                    |
| description  | text    | optional | markdown                                                  |
| starts_at    | integer | optional |                                                           |
| ends_at      | integer | optional | target date shown to the client                           |
| github_repo  | text    | optional | `owner/name`, opt-in sync                                 |
| created_by   | text    | required | membership.id                                             |

Relations: belongs to workspace, optionally company and deal; has many project_member, milestone, task, channel, invoice, document.

Who sees a project:

- Owners and admins see all.
- Members see projects where they have a project_member row.
- Clients see projects where `project.company_id` equals their `membership.company_id`. No rows to keep in sync.

## project_member

| Column        | Type | Rule     | Notes                         |
| ------------- | ---- | -------- | ----------------------------- |
| id            | text | required |                               |
| project_id    | text | required | unique with membership_id     |
| membership_id | text | required |                               |
| role          | text | required | `manager`, `member`, `viewer` |

Clients are never project members; their access is derived from the company.

| Role    | Can                                                                |
| ------- | ------------------------------------------------------------------ |
| manager | edit the project, milestones, members, send invoices and documents |
| member  | work tasks, post in channels, upload files                         |
| viewer  | read internal channel and tasks, nothing else                      |

## milestone

What the client sees instead of tasks. Ordered by `position`.

| Column      | Type    | Rule     | Notes                                    |
| ----------- | ------- | -------- | ---------------------------------------- |
| id          | text    | required |                                          |
| project_id  | text    | required |                                          |
| title       | text    | required |                                          |
| description | text    | optional | markdown, client visible                 |
| due_at      | integer | optional |                                          |
| status      | text    | required | `open`, `done`                           |
| position    | real    | required | sort key                                 |
| invoice_id  | text    | later    | invoice.id when this milestone is billed |
| done_at     | integer | optional |                                          |

Relations: belongs to project; has many task; optionally one invoice.

## Later

- `deal_id` gains its foreign key when CRM ships.
- The project status list may gain `proposal` if projects start being created before the deal is won.
