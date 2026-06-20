# Product Scope

## Working Name

Agent Owner Action Board

## One-Liner

A local owner-action board that tells you what your autonomous agent needs from you before it can continue useful work.

## Core Job

Prevent autonomous agent loops from turning real blockers into fake progress.

## MVP

The first version should be a static local HTML report generated from JSON files. It does not need a database, login, cloud sync, or background daemon.

## Required Inputs

- Project name
- Last run timestamp
- Agent status
- Current checkpoint
- Blockers
- Owner actions with status, location, due date, and reason
- Recent commits
- Next scheduled data/review window

## Required Output

- One HTML page
- Clear status indicator
- Owner action list as the primary surface
- Last run details
- Blocked projects separated from active projects

## Non-Goals

- No cloud service.
- No payment integration.
- No process manager in v0.
- No automatic control of other agents in v0.
- No destructive repo actions.

## Why This Might Sell

The pain is owner handoff, not abstract observability. People will not leave an agent running if they cannot tell whether the next useful action is code, data, account access, payment setup, or a human decision.

## Why This Might Fail

- Too small to pay for.
- Users prefer custom scripts.
- Existing agent platforms add this feature quickly.
- The buyer base is still narrow.
