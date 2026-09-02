# Chat

Lean Slack. Every project has two channels, internal and with the client. Beyond that there are general channels anyone can join and directs between any set of people.

## channel

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| workspace_id | text | required | |
| kind | text | required | `project_internal`, `project_client`, `general`, `direct` |
| project_id | text | later | required for the two project kinds, unique with kind; empty otherwise |
| name | text | later | required for `general`; project channels are named after the project; directs are named after their members |
| topic | text | optional | |
| created_by | text | optional | membership.id; empty for the two auto-created project channels |
| archived_at | integer | optional | |

Who is in a channel:

| Kind | Members |
| --- | --- |
| project_internal | derived: project_member rows of the project |
| project_client | derived: project_member rows plus client memberships of the project's company |
| general | explicit channel_member rows; any member may join |
| direct | explicit channel_member rows; two or more people |

Relations: belongs to workspace, optionally project; has many message, channel_member, channel_read.

## channel_member

Only for `general` and `direct` channels. Project channels have no rows here.

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| channel_id | text | required | primary key with membership_id |
| membership_id | text | required | |
| joined_at | integer | required | |

## message

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| id | text | required | |
| channel_id | text | required | |
| author_id | text | required | membership.id |
| parent_message_id | text | optional | thread reply, one level; a reply cannot have replies |
| body | text | required | markdown; mentions as `@membership_id` |
| edited_at | integer | optional | |
| deleted_at | integer | optional | body is blanked, row stays so the thread keeps its shape |

Relations: belongs to channel and author; has many reaction, attachment, thread replies.

A mention in a message creates an inbox item for the mentioned member. A message in a direct creates an inbox item for every other member of that direct. Ordinary channel traffic does not reach the inbox; unread is tracked by channel_read.

## reaction

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| message_id | text | required | primary key with membership_id and emoji |
| membership_id | text | required | |
| emoji | text | required | the character itself |
| created_at | integer | required | |

## channel_read

| Column | Type | Rule | Notes |
| --- | --- | --- | --- |
| channel_id | text | required | primary key with membership_id |
| membership_id | text | required | |
| last_read_at | integer | required | unread is messages newer than this |

## Later

- Pinned messages: a `pinned_at` on message, when asked for.
- Search over messages is a query, not a table, until it is slow.
