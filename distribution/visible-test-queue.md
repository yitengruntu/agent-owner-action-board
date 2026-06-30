# Visible Test Queue

Goal: start one valid exposure window for Agent Owner Action Board.

A test is valid only if normal readers can see the post or comment. Removed, dead, filtered, or hidden attempts do not count.

## Preferred Next Test

Post as a comment or reply in an already-active discussion about local coding agents, autonomous agents, Claude Code, Codex, Cursor, or agent workflows.

Why this is preferred:

- Lower moderation risk than a new self-promotion post.
- The question is workflow-specific.
- A reply can include the repo only when it is relevant to the thread.

Copy:

```text
I keep hitting a related issue with local coding/business agents: they work until they need me to provide account access, a data export, an approval, or a decision, and then that owner action gets buried in terminal output or chat history.

I made a tiny static prototype for this handoff:
https://github.com/yitengruntu/agent-owner-action-board

It is not a daemon or hosted dashboard. The idea is just: agent writes one JSON status file, then a local HTML board shows the blocker, exact owner action, and next review window.

Do people here track this manually today, or is there a cleaner pattern I should study?
```

## Backup Test

Share the GitHub repo directly with one small builder community where links are allowed.

Use:

```text
I made a small local-first prototype for tracking what autonomous AI agents need from the owner next:

https://github.com/yitengruntu/agent-owner-action-board

It is for Codex/Claude Code/Cursor/local-script users who run agents across projects and lose track of which ones are waiting on a human action.

I am trying to validate the workflow before building runner-specific connectors. Which runner should this connect to first?
```

## What To Check After Posting

At 24 hours:

- Is the post/comment still visible?
- GitHub repo views and unique visitors.
- GitHub clones and unique cloners.
- Stars, issues, comments, or specific connector requests.
- Thread comments with workflow details.

At 72 hours:

- Continue only if there are direct technical interactions, apparent install attempts, or a concrete connector request.
- Park if the visible test gets no workflow-specific response.
