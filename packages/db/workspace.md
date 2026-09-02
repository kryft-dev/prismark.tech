# Workspace

A workspace is one company using the app. Self-hosted installs usually have one. A `membership` is a user inside a workspace with a role; nearly every other table's "who" columns point at membership, not user.

## workspace

| Column              | Type    | Rule     | Notes                         |
| ------------------- | ------- | -------- | ----------------------------- |
| id                  | text    | required |                               |
| name                | text    | required |                               |
| slug                | text    | required | unique, used in URLs          |
| base_currency       | text    | required | ISO 4217, the ledger currency |
| timezone            | text    | required | IANA name                     |
| logo_file_id        | text    | optional | file.id                       |
| invoice_prefix      | text    | required | default `INV`                 |
| next_invoice_number | integer | required | starts at 1                   |
| next_task_number    | integer | required | starts at 1                   |
| next_deal_number    | integer | required | starts at 1                   |

Relations: has many membership, project, company, channel, account, file.

## membership

| Column       | Type    | Rule     | Notes                                                                    |
| ------------ | ------- | -------- | ------------------------------------------------------------------------ |
| id           | text    | required |                                                                          |
| workspace_id | text    | required |                                                                          |
| user_id      | text    | required | unique with workspace_id                                                 |
| role         | text    | required | `owner`, `admin`, `member`, `client`                                     |
| company_id   | text    | later    | company.id; required when role is `client`, empty otherwise              |
| title        | text    | optional | "Designer", shown on the Team screen                                     |
| invited_by   | text    | optional | membership.id of who created the account; empty only for the first owner |
| preferences  | text    | optional | JSON, notification and display settings nobody has designed yet          |
| removed_at   | integer | optional | access ends, history keeps the name                                      |

Relations: belongs to workspace and user; has many project_member, pay_rule, earning, payout, time_entry, inbox_item.

Roles, workspace level:

| Role   | Can                                                                                                |
| ------ | -------------------------------------------------------------------------------------------------- |
| owner  | everything, including billing settings and deleting the workspace                                  |
| admin  | manage people, projects, money, integrations                                                       |
| member | see projects they are on, tasks they are on, their own earnings                                    |
| client | the portal only: their company's projects, milestones, invoices, documents, and the client channel |

Project level roles are on `project_member`, see [projects.md](projects.md).

## Later

- `company_id` gains a foreign key and a check `role = 'client' or company_id is null`.
- Preferences may split into columns once there are more than a handful.
