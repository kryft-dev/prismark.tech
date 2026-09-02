# Documents

Contracts and proposals that clients sign in the portal. Signing needs a portal account, so the audit trail names a real user. What was signed is frozen as a version with a hash.

## document

| Column             | Type    | Rule     | Notes                                                    |
| ------------------ | ------- | -------- | -------------------------------------------------------- |
| id                 | text    | required |                                                          |
| workspace_id       | text    | required |                                                          |
| title              | text    | required |                                                          |
| project_id         | text    | optional |                                                          |
| company_id         | text    | later    | required before sending; the company whose contacts sign |
| status             | text    | required | `draft`, `sent`, `signed`, `declined`, `void`            |
| current_version_id | text    | later    | document_version.id; the one being signed                |
| sent_at            | integer | optional |                                                          |
| expires_at         | integer | optional | signing window                                           |
| completed_at       | integer | optional | every signer signed                                      |
| created_by         | text    | required | membership.id                                            |
| deleted_at         | integer | optional | drafts only; anything sent is voided instead             |

Relations: belongs to workspace, optionally project and company; has many document_version, document_signer, document_event, comment.

## document_version

Immutable. A new upload after sending makes a new version and resets signers.

| Column      | Type    | Rule     | Notes                           |
| ----------- | ------- | -------- | ------------------------------- |
| id          | text    | required |                                 |
| document_id | text    | required |                                 |
| file_id     | text    | required | the PDF                         |
| sha256      | text    | required | hex, what the signature is over |
| number      | integer | required | 1, 2, 3 within the document     |
| created_by  | text    | required | membership.id                   |
| created_at  | integer | required |                                 |

## document_signer

| Column            | Type    | Rule     | Notes                                                           |
| ----------------- | ------- | -------- | --------------------------------------------------------------- |
| id                | text    | required |                                                                 |
| document_id       | text    | required |                                                                 |
| contact_id        | text    | required | who is asked to sign                                            |
| position          | integer | required | signing order, 1 first                                          |
| status            | text    | required | `pending`, `signed`, `declined`                                 |
| signed_at         | integer | optional |                                                                 |
| signed_by_user_id | text    | optional | user.id that was logged in when signing; equals contact.user_id |
| version_id        | text    | optional | document_version.id that was signed                             |
| typed_name        | text    | optional | what they typed as their signature                              |
| ip                | text    | optional |                                                                 |
| user_agent        | text    | optional |                                                                 |
| decline_reason    | text    | optional |                                                                 |

Relations: belongs to document and contact.

## document_event

Append only audit trail. Shown under the document as the spine.

| Column              | Type    | Rule     | Notes                                                                        |
| ------------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| id                  | text    | required |                                                                              |
| document_id         | text    | required |                                                                              |
| kind                | text    | required | `created`, `sent`, `viewed`, `signed`, `declined`, `voided`, `version_added` |
| actor_membership_id | text    | optional | membership.id; client actions carry their client membership                  |
| signer_id           | text    | optional | document_signer.id for viewed, signed, declined                              |
| version_id          | text    | optional |                                                                              |
| ip                  | text    | optional |                                                                              |
| user_agent          | text    | optional |                                                                              |
| created_at          | integer | required |                                                                              |

## Later

- Signing fields placed on the PDF are not modelled; the whole version is signed.
- A signed PDF with the audit page appended is a new file the app generates, stored as `document.signed_file_id` when that exists.
