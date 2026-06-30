# Agent Owner Action Board

Know what your autonomous AI agent needs from you next.

This is a small local demo for people running coding or business agents on their own machine. It turns agent status into a clear owner-action report: what stopped, what decision or data is needed, where the owner should act, and when the next review window is due.

## Try The Demo

- Local demo: open `demo/index.html`
- GitHub Pages-ready demo: `docs/index.html`

Public demo:

`https://yitengruntu.github.io/agent-owner-action-board/`

The demo uses `product/data-model.json` as the example project state.

## Use With A Local Agent

At the end of a run, have the agent write:

```text
.agent-owner-actions/status.json
```

The file should follow `product/agent-output-contract.md`. A board renderer can then turn that one file into a local HTML report.

Render the bundled sample:

```bash
npm run render
```

Render an agent-written file:

```bash
npm run render -- .agent-owner-actions/status.json board.html
```

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

The intended integration is deliberately small: at the end of each run, an agent writes one JSON file.

```text
.agent-owner-actions/status.json
```

The static demo shows the expected shape in `product/data-model.json`. The field-level contract is in `product/agent-output-contract.md`.

Owner actions should be created only when the agent cannot continue without a specific human input, approval, account action, data export, or timed read. Normal agent work should stay out of the board.

## Feedback Wanted

Open an issue if you want this connected to a specific workflow such as Codex, Claude Code, Cursor, cron, GitHub Actions, or a custom local runner.

That connection request is the validation signal for deciding whether this should become a real local utility.

## Run The Check

```bash
npm run validate
```
