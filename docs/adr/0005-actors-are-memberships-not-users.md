# Actors are memberships, not users

Every column that answers "who did this" (created_by, author_id, actor_id, owner_id, reviewer_id, invited_by, and the rest) references a membership, not a user. A person acts inside a workspace, with a role and a name that workspace knows them by, and can be removed from one workspace while staying in another. Pointing at the user would make every query join through the workspace to find out what the actor was allowed to do, and would leave history pointing at people who are no longer there. The one place a user is referenced directly is the session.
