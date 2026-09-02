# @prismark/design

The UX prototype for Prismark and the pictures rendered from it.

```
prismark-dark.html   the prototype, one self-contained file, open it in a browser
render.mjs           renders every screen in it to PNG
screens.json         index of what was rendered, written by render.mjs
desktop/             30 desktop screens, 2880 by 1800, D01 to D30
mobile/              20 phone screens, 780 by 1690, M01 to M20
```

The HTML is the source. The PNGs are output. Edit the HTML, re-render,
commit both. Never edit a PNG.

The rules behind every screen are in [DESIGN.md](../../DESIGN.md) at the
repo root.

## Rendering

Once per machine, fetch Playwright's Chromium:

```sh
pnpm --filter @prismark/design browser
```

Then, from the repo root:

```sh
pnpm render
```

Turbo caches the result on the HTML and the script, so a second run with
no changes does nothing. Screens come out at 2x with the Geist fonts
loaded from Google Fonts, so rendering needs network access.

## How to read the codes

`D` is a desktop frame at 1440 by 900, `M` a phone at 390 by 844. Codes
follow page order in the prototype, which is also the order below. The
same code is used in the prototype's table of contents.

## Desktop

| Code  | Screen                         | File                                                                                   |
| ----- | ------------------------------ | -------------------------------------------------------------------------------------- |
| `D01` | Inbox                          | [D01-inbox.png](desktop/D01-inbox.png)                                                 |
| `D02` | Projects                       | [D02-projects.png](desktop/D02-projects.png)                                           |
| `D03` | Project overview               | [D03-project-overview.png](desktop/D03-project-overview.png)                           |
| `D04` | Project tasks, board           | [D04-project-tasks-board.png](desktop/D04-project-tasks-board.png)                     |
| `D05` | Task                           | [D05-task.png](desktop/D05-task.png)                                                   |
| `D06` | Tasks, board                   | [D06-tasks-board.png](desktop/D06-tasks-board.png)                                     |
| `D07` | My work                        | [D07-my-work.png](desktop/D07-my-work.png)                                             |
| `D08` | Project chat, internal         | [D08-project-chat-internal.png](desktop/D08-project-chat-internal.png)                 |
| `D09` | Project chat with the client   | [D09-project-chat-with-the-client.png](desktop/D09-project-chat-with-the-client.png)   |
| `D10` | Project files                  | [D10-project-files.png](desktop/D10-project-files.png)                                 |
| `D11` | Project invoices               | [D11-project-invoices.png](desktop/D11-project-invoices.png)                           |
| `D12` | Project documents              | [D12-project-documents.png](desktop/D12-project-documents.png)                         |
| `D13` | Project people                 | [D13-project-people.png](desktop/D13-project-people.png)                               |
| `D14` | Clients, pipeline              | [D14-clients-pipeline.png](desktop/D14-clients-pipeline.png)                           |
| `D15` | Companies                      | [D15-companies.png](desktop/D15-companies.png)                                         |
| `D16` | Company                        | [D16-company.png](desktop/D16-company.png)                                             |
| `D17` | Deal                           | [D17-deal.png](desktop/D17-deal.png)                                                   |
| `D18` | Money                          | [D18-money.png](desktop/D18-money.png)                                                 |
| `D19` | Invoices                       | [D19-invoices.png](desktop/D19-invoices.png)                                           |
| `D20` | Invoice                        | [D20-invoice.png](desktop/D20-invoice.png)                                             |
| `D21` | Ledger                         | [D21-ledger.png](desktop/D21-ledger.png)                                               |
| `D22` | My earnings                    | [D22-my-earnings.png](desktop/D22-my-earnings.png)                                     |
| `D23` | Team                           | [D23-team.png](desktop/D23-team.png)                                                   |
| `D24` | Person                         | [D24-person.png](desktop/D24-person.png)                                               |
| `D25` | Settings, workspace            | [D25-settings-workspace.png](desktop/D25-settings-workspace.png)                       |
| `D26` | Settings, integrations         | [D26-settings-integrations.png](desktop/D26-settings-integrations.png)                 |
| `D27` | Settings, sign-in and accounts | [D27-settings-sign-in-and-accounts.png](desktop/D27-settings-sign-in-and-accounts.png) |
| `D28` | Client portal                  | [D28-client-portal.png](desktop/D28-client-portal.png)                                 |
| `D29` | Channel                        | [D29-channel.png](desktop/D29-channel.png)                                             |
| `D30` | Search                         | [D30-search.png](desktop/D30-search.png)                                               |

## Mobile

| Code  | Screen               | File                                                                |
| ----- | -------------------- | ------------------------------------------------------------------- |
| `M01` | Sign in              | [M01-sign-in.png](mobile/M01-sign-in.png)                           |
| `M02` | Code                 | [M02-code.png](mobile/M02-code.png)                                 |
| `M03` | Inbox                | [M03-inbox.png](mobile/M03-inbox.png)                               |
| `M04` | My work              | [M04-my-work.png](mobile/M04-my-work.png)                           |
| `M05` | Task                 | [M05-task.png](mobile/M05-task.png)                                 |
| `M06` | New task             | [M06-new-task.png](mobile/M06-new-task.png)                         |
| `M07` | Chats                | [M07-chats.png](mobile/M07-chats.png)                               |
| `M08` | Chat with the client | [M08-chat-with-the-client.png](mobile/M08-chat-with-the-client.png) |
| `M09` | Projects             | [M09-projects.png](mobile/M09-projects.png)                         |
| `M10` | Project              | [M10-project.png](mobile/M10-project.png)                           |
| `M11` | More                 | [M11-more.png](mobile/M11-more.png)                                 |
| `M12` | Money                | [M12-money.png](mobile/M12-money.png)                               |
| `M13` | My earnings          | [M13-my-earnings.png](mobile/M13-my-earnings.png)                   |
| `M14` | Pipeline             | [M14-pipeline.png](mobile/M14-pipeline.png)                         |
| `M15` | Deal                 | [M15-deal.png](mobile/M15-deal.png)                                 |
| `M16` | Client project       | [M16-client-project.png](mobile/M16-client-project.png)             |
| `M17` | Client pay invoice   | [M17-client-pay-invoice.png](mobile/M17-client-pay-invoice.png)     |
| `M18` | Client sign document | [M18-client-sign-document.png](mobile/M18-client-sign-document.png) |
| `M19` | Project board        | [M19-project-board.png](mobile/M19-project-board.png)               |
| `M20` | Board everything     | [M20-board-everything.png](mobile/M20-board-everything.png)         |

## Who the screens are for

- `D01` to `D13`, `D18` to `D30`, `M01` to `M15`, `M19`, `M20` are what
  the Prismark team sees, signed in as Hammad unless noted. `D22` and
  `M13` to `M15` are Sara, a sales rep.
- `D28` and `M16` to `M18` are the client portal, signed in as Dana at
  Acme Inc.
