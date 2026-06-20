# Validation Plan

## Hypothesis

Builders running local AI agents will use a simple owner-action report if it makes stopped work actionable without adding cloud setup.

## Fastest Proof

Build a static generated HTML report and show it as a demo. Ask whether users would run it against their own agent projects to track required owner decisions, data exports, account access, and review windows.

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

## Next Build Checkpoint

Revise the static HTML demo so owner actions are the lead surface, then package it for a small GitHub-style release once owner approval is given.
