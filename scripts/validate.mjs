import fs from "node:fs";
import { assertBoard } from "./board-schema.mjs";

const requiredFiles = [
  "README.md",
  "LICENSE",
  "demo/index.html",
  "product/agent-output-contract.md",
  "docs/index.html",
  "product/data-model.json",
  "product/install.md",
  "product/launch-positioning.md",
  "product/readiness-audit.md",
  "product/scope.md",
  "product/validation-plan.md",
  "product/validation-log.md",
  "scripts/board-schema.mjs",
  "scripts/check-status.mjs",
  "scripts/render-board.mjs",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/connector-request.yml",
  "distribution/launch-copy.md"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const demo = fs.readFileSync("demo/index.html", "utf8");
for (const marker of ["Agent Owner Action Board", "Open owner actions", "What the agent needs next"]) {
  if (!demo.includes(marker)) {
    throw new Error(`Demo missing marker: ${marker}`);
  }
}

const docs = fs.readFileSync("docs/index.html", "utf8");
if (docs !== demo) {
  throw new Error("docs/index.html must match demo/index.html");
}

const renderScript = fs.readFileSync("scripts/render-board.mjs", "utf8");
for (const marker of ["product/data-model.json", "escapeHtml", "Rendered"]) {
  if (!renderScript.includes(marker)) {
    throw new Error(`Renderer missing marker: ${marker}`);
  }
}

assertBoard(JSON.parse(fs.readFileSync("product/data-model.json", "utf8")), "product/data-model.json");

const readme = fs.readFileSync("README.md", "utf8");
for (const marker of ["https://yitengruntu.github.io/agent-owner-action-board/", "Open an issue"]) {
  if (!readme.includes(marker)) {
    throw new Error(`README missing marker: ${marker}`);
  }
}

console.log("agent-owner-action-board validation passed");
