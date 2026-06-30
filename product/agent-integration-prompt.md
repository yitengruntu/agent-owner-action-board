# Agent Integration Prompt

Paste this into a local coding or business agent that should report owner-blocking work to Agent Owner Action Board.

```text
At the end of every meaningful run, write or update `.agent-owner-actions/status.json` in the current project.

Use contract version 1. The JSON must match `product/agent-output-contract.md` from Agent Owner Action Board.

Rules:
- Record only projects that you are actively working on or waiting to review.
- Set `blocked: true` only when useful progress cannot continue without a human action, account access, approval, external data export, or a timed read.
- Create `owner_actions[]` only for specific human actions. Do not include normal agent work.
- Every owner action must say where the owner should act, what to do, why it matters, urgency, and needed_by.
- If the task only needs waiting for data or time, set `status: "waiting_for_data"` and set `next_review`.
- If the project should stop until the owner responds, set `status: "waiting_for_owner"` and make the blocker explicit.
- Keep `current_checkpoint` to one concise sentence.
- Include recent commits if you changed files.

After writing the file, run:

npm run check:status -- .agent-owner-actions/status.json
npm run render -- .agent-owner-actions/status.json board.html

If validation fails, fix the JSON before ending the run.
```

## Minimal Status Example

```json
{
  "version": 1,
  "generated_at": "2026-06-30T14:00:00+08:00",
  "projects": [
    {
      "id": "example-project",
      "name": "Example Project",
      "status": "waiting_for_owner",
      "last_run_at": "2026-06-30T13:55:00+08:00",
      "current_checkpoint": "The agent shipped the first validation page and needs a real traffic read.",
      "blocked": true,
      "blocker": "No decision-grade traffic data is available yet.",
      "owner_actions": [
        {
          "id": "oa-001",
          "status": "open",
          "urgency": "next",
          "needed_by": "2026-07-01",
          "where": "GitHub Traffic",
          "what": "Check views, unique visitors, clones, and stars for the last 24 hours.",
          "why": "The agent needs real demand data before choosing the next channel."
        }
      ],
      "recent_commits": [
        {
          "hash": "abc1234",
          "message": "Publish validation page",
          "created_at": "2026-06-30T13:50:00+08:00"
        }
      ],
      "next_review": {
        "date": "2026-07-01",
        "reason": "24-hour read after public distribution"
      }
    }
  ]
}
```
