# Install Notes

This package is a local static demo for an owner-action board. It does not install a daemon or connect to any agent automatically yet.

## Files

- `demo/index.html`: generated static demo
- `product/data-model.json`: sample project status and owner-action data
- `product/scope.md`: product scope
- `product/validation-plan.md`: validation rules

## How To Inspect

Open `demo/index.html` in a browser.

## How This Would Connect Later

A real version should let a local agent write a JSON file with:

- project name
- last run timestamp
- current checkpoint
- blocker
- owner actions
- recent commits
- next review date

The board should render that JSON into a local HTML report.

## Stop Rule

Do not build runner integrations until someone asks how to connect this to their local agent workflow.
