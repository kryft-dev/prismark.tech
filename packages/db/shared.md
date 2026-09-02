# Shared

The cross-cutting tables. Four of them point at "some row" with a `target_type` and `target_id` pair; these are the only polymorphic references in the schema. Each lists its allowed targets.

## file

Bytes live in R2. The row is the metadata.

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| workspace_id | text | required | |
| key | text | required | R2 object key, unique |
| name | text | required | original file name |
| size | integer | required | bytes |
| mime | text | required | |
| sha256 | text | required | hex |
| visibility | text | required | `internal`, `client`; only `client` files show in the portal |
| project_id | text | optional | for the project Files screen |
| uploaded_by | text | required | membership.id |
| deleted_at | integer | optional | R2 object removed by a cleanup job after |

Relations: belongs to workspace, optionally project; has many attachment. Also referenced directly by user.avatar_file_id, workspace.logo_file_id, document_version.file_id, expense.receipt_file_id.

## attachment

Links a file to the thing it was dropped on.

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| file_id | text | required | |
| target_type | text | required | `task`, `comment`, `message`, `deal`, `expense`, `document` |
| target_id | text | required | |
| created_by | text | required | membership.id |
| created_at | integer | required | |

## comment

Discussion on a thing that is not a chat channel. Task comments live here, so a task keeps its conversation when it moves between projects.

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| target_type | text | required | `task`, `deal`, `company`, `invoice`, `document`, `expense` |
| target_id | text | required | |
| author_id | text | required | membership.id |
| body | text | required | markdown; mentions as `@membership_id` |
| edited_at | integer | optional | |
| deleted_at | integer | optional | |

Relations: belongs to author; has many attachment.

## activity

Append only log of what happened. Source for the project overview spine, the inbox, and audit. One row per event; inbox items fan out from it.

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| workspace_id | text | required | |
| actor_id | text | optional | membership.id; empty for system events like a Stripe webhook |
| verb | text | required | dotted, `task.created`, `task.moved`, `task.assigned`, `comment.added`, `message.mentioned`, `invoice.sent`, `invoice.paid`, `document.signed`, `deal.moved`, `milestone.done`, `expense.added` |
| target_type | text | required | `task`, `project`, `milestone`, `comment`, `message`, `channel`, `deal`, `company`, `invoice`, `payment`, `expense`, `document` |
| target_id | text | required | |
| project_id | text | optional | copied from the target when it has one, so the project feed is one query |
| data | text | optional | JSON, the small details a feed line needs: old and new status, amount, names |
| created_at | integer | required | |

## inbox_item

One row per member per thing waiting on them. The home screen. Read and done are separate: reading is looking, done is dealt with.

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| membership_id | text | required | |
| activity_id | text | required | the event that caused it |
| kind | text | required | `mention`, `direct`, `assigned`, `review_requested`, `comment`, `due_soon`, `invoice_paid`, `document_signed`, `deal_moved` |
| target_type | text | required | same list as activity |
| target_id | text | required | |
| read_at | integer | optional | |
| done_at | integer | optional | |
| created_at | integer | required | |

Relations: belongs to membership and activity.

Who gets what:

| Kind | Recipients |
| --- | --- |
| mention | the mentioned member |
| direct | every other member of the direct channel |
| assigned | the new assignee |
| review_requested | task.reviewer_id |
| comment | assignees and creator of the task, owner of the deal |
| due_soon | assignees, one day before due_at, made by a scheduled job |
| invoice_paid | the invoice creator and project managers |
| document_signed | the document creator |
| deal_moved | the deal owner, when moved by someone else |

## Later

- Email or push delivery of inbox items is a job reading `inbox_item` where `read_at` is null, no extra table until digests exist.
- If activity grows past what D1 likes, it partitions by month; nothing references it except inbox_item.
