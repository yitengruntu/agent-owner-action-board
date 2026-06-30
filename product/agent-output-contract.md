# Agent Output Contract

This is the minimum file a local agent should write when it stops, pauses, or reaches a review gate.

Target path:

```text
.agent-owner-actions/status.json
```

## Shape

```json
{
  "version": 1,
  "generated_at": "2026-06-30T13:25:00+08:00",
  "projects": [
    {
      "id": "agent-owner-action-board",
      "name": "Agent Owner Action Board",
      "status": "waiting_for_owner",
      "last_run_at": "2026-06-30T13:20:00+08:00",
      "current_checkpoint": "What the agent just finished or learned.",
      "blocked": true,
      "blocker": "Why useful work cannot continue without a human action.",
      "owner_actions": [
        {
          "id": "oa-001",
          "status": "open",
          "urgency": "now",
          "needed_by": "2026-07-01",
          "where": "Google Search Console",
          "what": "Export the last 14 days of search performance.",
          "why": "The agent needs real traffic data before deciding whether to continue."
        }
      ],
      "recent_commits": [
        {
          "hash": "23a6851",
          "message": "Record blocked Reddit channel",
          "created_at": "2026-06-30T12:54:00+08:00"
        }
      ],
      "next_review": {
        "date": "2026-07-01",
        "reason": "24-hour read after visible distribution"
      }
    }
  ]
}
```

## Required Fields

- `version`: contract version, currently `1`.
- `generated_at`: when the board snapshot was written.
- `projects[].id`: stable machine-readable project id.
- `projects[].name`: readable project name.
- `projects[].status`: one of `working`, `waiting_for_owner`, `waiting_for_data`, `blocked`, `parked`.
- `projects[].last_run_at`: when the agent last made meaningful progress.
- `projects[].current_checkpoint`: one concise sentence about the current state.
- `projects[].blocked`: boolean.
- `projects[].blocker`: blank only when `blocked` is false.
- `projects[].owner_actions`: zero or more owner tasks.
- `projects[].next_review`: the next time the owner or agent should read data again.

## Owner Action Rules

An owner action should be created only when the agent cannot safely continue without a specific human input, account action, approval, export, or timed data read.

Do not create owner actions for normal agent work, vague suggestions, or tasks the agent can complete itself.

## Stop Rule

If every open owner action depends on the same missing human step, the agent should stop instead of starting another loop. The board should show the blocker rather than hiding it in terminal output.
