# Install Notes

This package is a local static demo for an owner-action board. It does not install a daemon or connect to any agent automatically yet.

## Files

- `demo/index.html`: generated static demo
- `product/data-model.json`: sample project status and owner-action data
- `product/agent-output-contract.md`: JSON contract an agent can write at the end of each run
- `product/scope.md`: product scope
- `product/validation-plan.md`: validation rules

## How To Inspect

Open `demo/index.html` in a browser.

## How This Would Connect Later

A local agent should write a JSON file like `product/data-model.json` to:

```text
.agent-owner-actions/status.json
```

The exact contract is documented in `product/agent-output-contract.md`. The board should render that JSON into a local HTML report.

## Stop Rule

Do not build runner integrations until someone asks how to connect this to their local agent workflow.
