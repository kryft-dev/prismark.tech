# Email code is the only sign-in

Prismark has one way in: a six-digit code sent to your email. No passwords, no OAuth, no magic links, no passkeys, and no self-service sign-up; every account is created by an existing member with permission. A ten-person agency does not need a second method, and every method that exists is one more thing to secure, support, and design a screen for. The schema has no password column and never will; if a second method is ever wanted it is a new table, not columns on user.

## Consequences

- The sign-in form answers identically for emails with no account, so it cannot be used to discover who has one.
- Clients get in the same way. A contact becomes a client member when someone creates their account.
