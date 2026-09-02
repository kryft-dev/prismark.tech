# Money

Everything that touches money, in three layers.

1. Documents: invoice, payment, expense, payout. What people see and act on.
2. Ledger: account, journal_entry, journal_line. Double entry underneath, in the workspace base currency. Every document that moves money posts exactly one entry. The five numbers on the Money screen are sums over accounts by kind.
3. Pay: pay_rule, earning. What each member is owed, tracked in the app, paid outside it.

Rules that hold across the layer:

- Amounts are integer minor units with a currency column beside them.
- Ledger lines are in base currency. A line whose source was in another currency keeps the original currency and amount on the line.
- Nothing here is deleted. Invoices are voided, entries are reversed by a new entry, payments that were wrong get a reversing entry.
- The lines of an entry sum to zero. Positive is debit.

## account

The chart. Five system roots, a few system children seeded on workspace creation, and children people add.

| Column       | Type    | Rule     | Notes                                                                     |
| ------------ | ------- | -------- | ------------------------------------------------------------------------- |
| id           | text    | required |                                                                           |
| workspace_id | text    | required |                                                                           |
| parent_id    | text    | optional | empty for the five roots                                                  |
| code         | text    | required | unique with workspace_id, `1000` style                                    |
| name         | text    | required |                                                                           |
| kind         | text    | required | `asset`, `liability`, `equity`, `income`, `expense`; copied from the root |
| is_system    | integer | required | 1 for seeded rows, cannot be renamed or archived                          |
| archived_at  | integer | optional |                                                                           |

Seed:

| Code | Name          | Kind      | Parent |
| ---- | ------------- | --------- | ------ |
| 1000 | Assets        | asset     |        |
| 1100 | Bank          | asset     | 1000   |
| 1200 | Receivable    | asset     | 1000   |
| 2000 | Liabilities   | liability |        |
| 2100 | Owed to team  | liability | 2000   |
| 2200 | Tax collected | liability | 2000   |
| 3000 | Equity        | equity    |        |
| 4000 | Income        | income    |        |
| 4100 | Client work   | income    | 4000   |
| 5000 | Expenses      | expense   |        |
| 5100 | Team pay      | expense   | 5000   |
| 5200 | Software      | expense   | 5000   |
| 5900 | Other         | expense   | 5000   |

Roots cannot gain siblings. People add children under any root.

## journal_entry

Immutable once written. At most one of the four source columns is set; an entry with none is a manual adjustment.

| Column       | Type    | Rule     | Notes                                           |
| ------------ | ------- | -------- | ----------------------------------------------- |
| id           | text    | required |                                                 |
| workspace_id | text    | required |                                                 |
| date         | integer | required | when it takes effect, not when it was typed     |
| memo         | text    | required |                                                 |
| invoice_id   | text    | optional |                                                 |
| payment_id   | text    | optional |                                                 |
| expense_id   | text    | optional |                                                 |
| payout_id    | text    | optional |                                                 |
| reverses_id  | text    | optional | journal_entry.id this one cancels               |
| created_by   | text    | optional | membership.id; empty for entries a webhook made |
| created_at   | integer | required |                                                 |

Relations: belongs to workspace, optionally one source; has two or more journal_line.

What posts what:

| Event            | Debit                      | Credit                                          |
| ---------------- | -------------------------- | ----------------------------------------------- |
| invoice sent     | Receivable                 | Client work, and Tax collected for the tax part |
| payment received | Bank                       | Receivable                                      |
| expense recorded | the expense account chosen | Bank                                            |
| earning accrued  | Team pay                   | Owed to team                                    |
| payout made      | Owed to team               | Bank                                            |

## journal_line

| Column            | Type    | Rule     | Notes                                                |
| ----------------- | ------- | -------- | ---------------------------------------------------- |
| id                | text    | required |                                                      |
| entry_id          | text    | required | journal_entry.id                                     |
| account_id        | text    | required |                                                      |
| amount            | integer | required | base currency minor units, signed, positive is debit |
| original_currency | text    | optional | set when the source was not in base currency         |
| original_amount   | integer | optional | with original_currency                               |
| memo              | text    | optional |                                                      |

## invoice

| Column         | Type    | Rule     | Notes                                                                                                   |
| -------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| id             | text    | required |                                                                                                         |
| workspace_id   | text    | required | numbering is per workspace                                                                              |
| company_id     | text    | required |                                                                                                         |
| project_id     | text    | optional |                                                                                                         |
| milestone_id   | text    | optional | must belong to project_id                                                                               |
| number         | integer | required | unique with workspace_id, from workspace.next_invoice_number; printed as prefix plus zero padded number |
| status         | text    | required | `draft`, `sent`, `paid`, `void`                                                                         |
| currency       | text    | required |                                                                                                         |
| issued_at      | integer | later    | required when sent                                                                                      |
| due_at         | integer | later    | required when sent; overdue is `sent` and past due, not a status                                        |
| subtotal       | integer | required | sum of lines                                                                                            |
| tax_rate_bp    | integer | required | basis points, 0 for none                                                                                |
| tax_amount     | integer | required |                                                                                                         |
| total          | integer | required | subtotal plus tax                                                                                       |
| notes          | text    | optional | printed under the lines                                                                                 |
| recurs_from_id | text    | optional | invoice.id this was cloned from, for retainers                                                          |
| sent_at        | integer | optional |                                                                                                         |
| paid_at        | integer | optional | when payments first covered total                                                                       |
| voided_at      | integer | optional |                                                                                                         |
| created_by     | text    | required | membership.id                                                                                           |

Relations: belongs to workspace and company, optionally project and milestone; has many invoice_line, payment, comment; posts one journal_entry when sent.

Status moves forward only: draft to sent to paid, or draft or sent to void. Editing a sent invoice is not allowed; void it and clone.

## invoice_line

| Column      | Type    | Rule     | Notes                               |
| ----------- | ------- | -------- | ----------------------------------- |
| id          | text    | required |                                     |
| invoice_id  | text    | required |                                     |
| position    | integer | required |                                     |
| description | text    | required |                                     |
| quantity    | real    | required | hours, units; 1 for fixed price     |
| unit_amount | integer | required | minor units in the invoice currency |
| amount      | integer | required | quantity times unit_amount, rounded |

Time entries billed on a line point back with `time_entry.invoice_line_id`.

## payment

Money in against an invoice. Partial payments are fine; the invoice is paid when the sum covers total.

| Column       | Type    | Rule     | Notes                                                    |
| ------------ | ------- | -------- | -------------------------------------------------------- |
| id           | text    | required |                                                          |
| invoice_id   | text    | required |                                                          |
| amount       | integer | required | in invoice currency                                      |
| currency     | text    | required | equals invoice.currency                                  |
| method       | text    | required | `stripe`, `bank`                                         |
| provider_ref | text    | optional | Stripe payment intent id, or the bank reference typed in |
| received_at  | integer | required |                                                          |
| recorded_by  | text    | optional | membership.id; empty when a Stripe webhook recorded it   |
| note         | text    | optional |                                                          |

Relations: belongs to invoice; posts one journal_entry; may spawn commission earning rows.

## expense

Money out to a vendor.

| Column          | Type    | Rule     | Notes                     |
| --------------- | ------- | -------- | ------------------------- |
| id              | text    | required |                           |
| workspace_id    | text    | required |                           |
| vendor          | text    | required | free text, "Cloudflare"   |
| amount          | integer | required |                           |
| currency        | text    | required |                           |
| account_id      | text    | required | an expense kind account   |
| spent_at        | integer | required |                           |
| project_id      | text    | optional | shows in the project cost |
| receipt_file_id | text    | optional | file.id                   |
| note            | text    | optional |                           |
| created_by      | text    | required | membership.id             |

Relations: belongs to workspace and account, optionally project; posts one journal_entry.

## pay_rule

How a member earns. A member can have several rules at once, salary plus commission is the usual pair.

| Column        | Type    | Rule     | Notes                                                                    |
| ------------- | ------- | -------- | ------------------------------------------------------------------------ |
| id            | text    | required |                                                                          |
| membership_id | text    | required |                                                                          |
| kind          | text    | required | `salary`, `commission`, `project_share`, `hourly`                        |
| amount        | integer | later    | salary per period or hourly rate; required for those kinds               |
| percent_bp    | integer | later    | basis points of paid invoices; required for commission and project_share |
| currency      | text    | required |                                                                          |
| period        | text    | later    | `monthly` for now; required for salary                                   |
| project_id    | text    | optional | scope; empty means every project in the workspace                        |
| active_from   | text    | required | `YYYY-MM-DD`                                                             |
| active_to     | text    | optional | `YYYY-MM-DD`, empty means still active                                   |
| created_by    | text    | required | membership.id                                                            |

Relations: belongs to membership, optionally project; has many earning.

## earning

What a member is owed, one row per accrual. Rows, not a view, so changing a rule next month does not rewrite last month.

| Column        | Type    | Rule     | Notes                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------- |
| id            | text    | required |                                                       |
| membership_id | text    | required |                                                       |
| pay_rule_id   | text    | required |                                                       |
| amount        | integer | required |                                                       |
| currency      | text    | required |                                                       |
| period_start  | text    | optional | `YYYY-MM-DD`, for salary and hourly                   |
| period_end    | text    | optional |                                                       |
| payment_id    | text    | optional | the client payment this commission or share came from |
| status        | text    | required | `accrued`, `paid`                                     |
| payout_id     | text    | optional | set with status `paid`                                |
| note          | text    | optional |                                                       |
| created_at    | integer | required |                                                       |

Relations: belongs to membership and pay_rule, optionally payment and payout. Hourly earnings point at their time entries through `time_entry.earning_id`.

Only owners, admins, and the member themself may read a member's earnings.

## payout

A record that money left the company to a member, made outside the app.

| Column        | Type    | Rule     | Notes                                    |
| ------------- | ------- | -------- | ---------------------------------------- |
| id            | text    | required |                                          |
| membership_id | text    | required |                                          |
| amount        | integer | required | equals the sum of the earnings it covers |
| currency      | text    | required |                                          |
| paid_at       | integer | required |                                          |
| method        | text    | optional | free text, "bank transfer"               |
| note          | text    | optional |                                          |
| created_by    | text    | required | membership.id                            |

Relations: belongs to membership; has many earning; posts one journal_entry.

## Later

- Exchange rates: an `fx_rate` table by day and pair when more than one rate a month matters. Until then the rate is whatever was typed when the line was posted.
- Credit notes, if a paid invoice ever needs partial refund, are a new document type that posts a reversing entry.
- Invoice schedules for retainers, replacing manual cloning through `recurs_from_id`.
- `pay_rule` gains check constraints tying `amount`, `percent_bp`, and `period` to `kind`.
