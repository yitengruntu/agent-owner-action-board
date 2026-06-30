# Validation Plan

## Hypothesis

Builders running local AI agents will use a simple owner-action report if it makes stopped work actionable without adding cloud setup.

## Fastest Proof

Build a static generated HTML report and show it as a demo. Ask whether users would run it against their own agent projects to track required owner decisions, data exports, account access, and review windows.

## Status

Active validation probe, but no valid exposure window has started yet.

## Channels

- GitHub-first public probe.
- GitHub Pages demo.
- One narrow community post or reply only when the post can remain visible.
- GitHub repo traffic after direct public sharing.

## Public Links

- Repo: https://github.com/yitengruntu/agent-owner-action-board
- Expected demo: https://yitengruntu.github.io/agent-owner-action-board/

## Window

- First read: 24 hours after first external distribution.
- Decision read: 72 hours after first external distribution.
- Removed, dead, filtered, or hidden posts do not start the window.

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

None for the repo. GitHub Pages and repo About fields are already configured.

## Next Build Checkpoint

Do not build connectors yet. Build a real connector only after an external user asks for a specific runner such as Codex, Claude Code, Cursor, cron, GitHub Actions, or a custom local script.

Use `product/measurement-checkpoints.md` for the 24-hour and 72-hour reads.
