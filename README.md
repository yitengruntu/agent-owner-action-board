# Agent Owner Action Board

Know what your autonomous AI agent needs from you next.

This is a small local demo for people running coding or business agents on their own machine. It turns agent status into a clear owner-action report: what stopped, what decision or data is needed, where the owner should act, and when the next review window is due.

## Try The Demo

Open:

`demo/index.html`

The demo uses `product/data-model.json` as the example project state.

## What It Tracks

- Last agent run
- Current checkpoint
- Blocker
- Owner-required actions by urgency
- Recent commits
- Next review window

## What It Is Not

This v0.1 package is not a daemon, hosted service, or live integration. It does not connect to private accounts, run an agent, or watch your machine in the background.

## Why This Exists

Long-running local agents often stop at the point where a human has to provide data, account access, approval, or a decision. Generic dashboards show status. This board focuses on the handoff: the exact action the owner must take before useful work can continue.

## Local Data Contract

A future connected version should let an agent write a JSON file with:

- project name
- last run timestamp
- current checkpoint
- blocker
- owner actions
- recent commits
- next review date

The static demo shows the expected shape in `product/data-model.json`.

## Feedback Wanted

Open an issue if you want this connected to a specific workflow such as Codex, Claude Code, Cursor, cron, GitHub Actions, or a custom local runner.

That connection request is the validation signal for deciding whether this should become a real local utility.
