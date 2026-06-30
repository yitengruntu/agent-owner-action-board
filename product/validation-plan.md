# Validation Plan

## Hypothesis

Builders running local AI agents will use a simple owner-action report if it makes stopped work actionable without adding cloud setup.

## Fastest Proof

Build a static generated HTML report and show it as a demo. Ask whether users would run it against their own agent projects to track required owner decisions, data exports, account access, and review windows.

## Status

Active validation probe.

## Channels

- GitHub-first public probe.
- GitHub Pages demo after Pages is enabled.
- One narrow community post after the repo is ready.

## Public Links

- Repo: https://github.com/yitengruntu/agent-owner-action-board
- Expected demo: https://yitengruntu.github.io/agent-owner-action-board/

## Window

- First read: 24 hours after first external distribution.
- Decision read: 72 hours after first external distribution.

## Signals

Leading:

- Demo views
- GitHub stars
- Comments asking how to connect it to Codex, Claude Code, Cursor, cron, or local scripts
- Requests for installation instructions

Conversion:

- Clone/install attempts
- Issues/questions from real use
- Direct request to support a specific agent runner or owner-action format

## Continue Condition

At least 5 direct technical interactions or 2 install attempts after a public demo/release.

## Kill Condition

No external technical interaction after a complete launch attempt.

## Owner Setup Needed

Before distribution, enable GitHub Pages from `main /docs` and set repo About fields:

- Description: `Track what your local AI agents need from you next.`
- Website: `https://yitengruntu.github.io/agent-owner-action-board/`
- Topics: `ai-agents`, `codex`, `claude-code`, `local-first`, `automation`

## Next Build Checkpoint

Do not build connectors yet. Build a real connector only after an external user asks for a specific runner such as Codex, Claude Code, Cursor, cron, GitHub Actions, or a custom local script.
