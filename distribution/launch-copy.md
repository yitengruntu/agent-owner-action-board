# Distribution Copy

Use this after GitHub Pages is enabled and the repo About fields are set.

## Community Draft

Title:

`How do you track what your local AI agents need from you?`

Body:

I keep running into a workflow problem with local coding/business agents: they do useful work until they need a human decision, account access, a data export, or approval. Then the actual owner action is buried in the terminal or chat history.

I made a tiny static prototype for an owner-action board:

`https://yitengruntu.github.io/agent-owner-action-board/`

Repo:

`https://github.com/yitengruntu/agent-owner-action-board`

It is not a daemon or hosted dashboard. It is a static report concept: last run, checkpoint, blocker, exact owner actions, recent commits, and next review window.

I am trying to validate whether this should become a real local utility.

Question: if you run Codex, Claude Code, Cursor, cron agents, or custom scripts, how do you track "the agent is waiting for me to do X" today?

## GitHub Reply Draft

This is related to a small probe I am testing:

`https://github.com/yitengruntu/agent-owner-action-board`

It turns local agent status into an owner-action report: what stopped, what the human needs to provide, and when to check again. I am trying to validate which runner connector matters first: Codex, Claude Code, Cursor, cron, GitHub Actions, or custom scripts.
