# Tasks

A task is a piece of work assigned to a person, a project, or both. It can have no project and no assignee at the same time; that is a task open to anyone in the workspace.

Visibility, one rule:

- A task with a project is visible to that project's contributors, managers, and viewers.
- A task with no project is visible to its assignees and its creator.
- Owners and admins see all tasks.
- Clients never see tasks.

Numbers are per workspace, so a task stays `#17` when it moves between projects.

## task

| Column           | Type    | Rule     | Notes                                                                            |
| ---------------- | ------- | -------- | -------------------------------------------------------------------------------- |
| id               | text    | required |                                                                                  |
| workspace_id     | text    | required |                                                                                  |
| number           | integer | required | unique with workspace_id, from workspace.next_task_number                        |
| project_id       | text    | optional |                                                                                  |
| milestone_id     | text    | optional | must belong to project_id                                                        |
| parent_task_id   | text    | optional | one level only; a subtask cannot have subtasks                                   |
| title            | text    | required |                                                                                  |
| description      | text    | optional | markdown                                                                         |
| status           | text    | required | `todo`, `doing`, `review`, `done`                                                |
| priority         | text    | required | `low`, `normal`, `high`, default `normal`                                        |
| position         | real    | required | order within its board column                                                    |
| due_at           | integer | optional |                                                                                  |
| estimate_minutes | integer | optional |                                                                                  |
| reviewer_id      | text    | optional | membership.id; moving to `review` creates a review requested inbox item for them |
| github_ref       | text    | optional | URL of the linked issue or pull request                                          |
| created_by       | text    | required | membership.id                                                                    |
| done_at          | integer | optional | set when status becomes `done`                                                   |
| deleted_at       | integer | optional |                                                                                  |

Relations: belongs to workspace, optionally project, milestone, parent task; has many task_assignee, time_entry, comment, attachment, subtask.

Board columns are the four statuses. "My work" is tasks where the member is an assignee or reviewer, not done. "Open to anyone" is tasks with zero assignees, not done.

## task_assignee

| Column        | Type    | Rule     | Notes                          |
| ------------- | ------- | -------- | ------------------------------ |
| task_id       | text    | required | primary key with membership_id |
| membership_id | text    | required |                                |
| assigned_by   | text    | required | membership.id                  |
| created_at    | integer | required |                                |

Zero rows means open to anyone. No `id` column; the pair is the key.

## time_entry

Minutes logged against a task or a project. Feeds hourly pay and project cost.

| Column          | Type    | Rule     | Notes                                                                         |
| --------------- | ------- | -------- | ----------------------------------------------------------------------------- |
| id              | text    | required |                                                                               |
| membership_id   | text    | required |                                                                               |
| task_id         | text    | optional |                                                                               |
| project_id      | text    | later    | copied from the task when task_id is set; at least one of the two must be set |
| day             | text    | required | `YYYY-MM-DD`                                                                  |
| minutes         | integer | required | positive                                                                      |
| note            | text    | optional |                                                                               |
| invoice_line_id | text    | optional | set when billed to a client                                                   |
| earning_id      | text    | optional | set when paid to the member                                                   |

Relations: belongs to membership, optionally task, project, invoice_line, earning.

## Later

- Custom board columns per project are deliberately not here. Adding a fifth status is one migration.
- Running timers are UI over time_entry, no schema.
- Check constraint: `parent_task_id` may not point at a task that itself has a parent.
