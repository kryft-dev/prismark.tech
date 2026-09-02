# Auth

Sign-in is a six digit code sent by email. Nothing else. There is no password column anywhere and there never will be. Accounts are created by an existing member, see [workspace.md](workspace.md) `membership.invited_by`.

A `user` is a person who can log in. What they can do lives on `membership`, one per workspace they belong to.

## user

Global, not scoped to a workspace. One row per email address.

| Column         | Type    | Rule     | Notes               |
| -------------- | ------- | -------- | ------------------- |
| id             | text    | required | ULID                |
| email          | text    | required | unique, lower-cased |
| name           | text    | required | display name        |
| avatar_file_id | text    | optional | file.id             |
| last_login_at  | integer | optional |                     |

Relations: has many session, has many membership. A CRM contact may point at a user, see [crm.md](crm.md).

## sign_in_attempt

One row per "send me a code" request.

| Column      | Type    | Rule     | Notes                                         |
| ----------- | ------- | -------- | --------------------------------------------- |
| id          | text    | required |                                               |
| email       | text    | required | as typed, lower-cased; may not match any user |
| code_hash   | text    | required | hash of the six digit code                    |
| expires_at  | integer | required | ten minutes after creation                    |
| consumed_at | integer | optional | set once                                      |
| attempts    | integer | required | wrong code count, lock at five                |
| ip          | text    | optional |                                               |
| user_agent  | text    | optional |                                               |

Immutable apart from `consumed_at` and `attempts`. Rows for emails with no user are stored and answered identically so the sign-in form cannot be used to find out who has an account. Purge after seven days.

## session

| Column       | Type    | Rule     | Notes                                                    |
| ------------ | ------- | -------- | -------------------------------------------------------- |
| id           | text    | required |                                                          |
| user_id      | text    | required |                                                          |
| token_hash   | text    | required | unique; the cookie holds the raw token                   |
| expires_at   | integer | required | thirty days, slides on use                               |
| last_seen_at | integer | required |                                                          |
| ip           | text    | optional |                                                          |
| user_agent   | text    | optional |                                                          |
| revoked_at   | integer | optional | "sign out everywhere" sets this on every row of the user |

Relations: belongs to user.

## Later

- Rate limiting per email and per ip is app logic on top of `sign_in_attempt`, no extra table.
- If a second sign-in method is ever added it is a new table, not columns on `user`.
