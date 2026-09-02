# CRM

Companies, the people at them, and deals. A company is a client when it has a Won deal or a project; there is no flag to go stale. Notes on companies and deals are rows in `comment`, see [shared.md](shared.md).

## company

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| workspace_id | text | required | |
| name | text | required | |
| website | text | optional | |
| country | text | optional | ISO 3166 alpha-2 |
| billing_address | text | optional | multi-line, printed on invoices |
| default_currency | text | optional | ISO 4217; new invoices and deals for this company start in it |
| archived_at | integer | optional | |

Relations: belongs to workspace; has many contact, deal, project, invoice, document, client membership.

## contact

A person at a company. Gets a `user_id` only when someone creates a portal account for them.

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| company_id | text | required | |
| name | text | required | |
| email | text | later | required before a portal account can be created |
| phone | text | optional | |
| title | text | optional | |
| user_id | text | optional | user.id once they have an account; the matching membership has role `client` and this company |
| is_primary | integer | required | 0 or 1; the one invoices are addressed to |
| archived_at | integer | optional | |

Relations: belongs to company, optionally user; has many document_signer.

## deal

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| company_id | text | required | |
| number | integer | required | unique within the workspace, from workspace.next_deal_number |
| title | text | required | |
| stage | text | required | `lead`, `contacted`, `proposal`, `won`, `lost` |
| value | integer | optional | minor units |
| currency | text | later | required when value is set |
| owner_id | text | required | membership.id |
| expected_close_at | integer | optional | |
| won_at | integer | optional | set with stage `won` |
| lost_at | integer | optional | set with stage `lost` |
| lost_reason | text | optional | |
| archived_at | integer | optional | |

Relations: belongs to company and owner; at most one project points back through `project.deal_id`; has many comment, attachment.

Pipeline board columns are the five stages. Moving a deal creates a `deal_moved` activity; winning it offers to create the project.

## Later

- Stage list stays fixed until someone asks for a sixth.
- Deal products or line items are not modelled; the proposal document carries the detail.
