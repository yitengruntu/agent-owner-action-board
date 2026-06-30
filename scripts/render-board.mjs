import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2] ?? "product/data-model.json";
const outputPaths = process.argv.slice(3);
const targets = outputPaths.length > 0 ? outputPaths : ["demo/index.html", "docs/index.html"];

const board = JSON.parse(fs.readFileSync(inputPath, "utf8"));

if (board.version !== 1) {
  throw new Error(`Unsupported board version: ${board.version}`);
}

if (!Array.isArray(board.projects)) {
  throw new Error("Board data must include projects[]");
}

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${renderBoard(board)}\n`);
}

console.log(`Rendered ${targets.join(", ")} from ${inputPath}`);

function renderBoard(data) {
  const projects = data.projects;
  const openActions = projects
    .flatMap((project) =>
      Array.isArray(project.owner_actions)
        ? project.owner_actions
            .filter((action) => action.status !== "done")
            .map((action) => ({ project, action }))
        : []
    )
    .sort((left, right) => urgencyRank(left.action.urgency) - urgencyRank(right.action.urgency));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Agent Owner Action Board Demo</title>
    <style>
      :root {
        --ink: #101513;
        --muted: #5c6862;
        --paper: #f4f6f1;
        --panel: #ffffff;
        --line: #d9dfd7;
        --accent: #0d7f69;
        --warn: #b45b18;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--paper);
        color: var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        width: min(1120px, calc(100% - 36px));
        margin: 0 auto;
        padding: 44px 0 64px;
      }
      .hero {
        display: grid;
        grid-template-columns: 0.9fr 1.1fr;
        gap: 44px;
        align-items: end;
        padding-bottom: 36px;
        border-bottom: 1px solid var(--line);
      }
      .eyebrow {
        margin: 0 0 12px;
        color: var(--muted);
        font-size: 0.78rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      h1, h2, h3, p { margin: 0; }
      h1 {
        max-width: 10ch;
        font-size: clamp(3.6rem, 8vw, 6.8rem);
        line-height: 0.9;
        letter-spacing: 0;
      }
      .hero p:last-child {
        max-width: 42rem;
        color: var(--muted);
        font-size: 1.2rem;
        line-height: 1.55;
      }
      .action-board,
      .project-card {
        margin-top: 28px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: var(--panel);
        box-shadow: 0 24px 80px rgba(43, 58, 50, 0.12);
        overflow: hidden;
      }
      .action-board {
        display: grid;
        grid-template-columns: 0.78fr 1.22fr;
      }
      .action-intro {
        border-right: 1px solid var(--line);
        padding: 28px;
        background: #edf2ed;
      }
      .action-intro strong {
        display: block;
        margin-top: 10px;
        font-size: clamp(2rem, 5vw, 4.2rem);
        line-height: 0.95;
      }
      .action-list {
        padding: 28px;
      }
      .project-head {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 20px;
        padding: 28px;
        border-bottom: 1px solid var(--line);
      }
      h2 { font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1; }
      .status-pill {
        display: inline-flex;
        align-items: center;
        min-height: 38px;
        border-radius: 999px;
        padding: 0 16px;
        background: #fff3e8;
        color: var(--warn);
        font-weight: 900;
      }
      .status-pill.is-working {
        background: #e7f6ef;
        color: var(--accent);
      }
      .meta-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        margin: 0;
        border-bottom: 1px solid var(--line);
      }
      .meta-grid div {
        min-height: 128px;
        padding: 22px;
        border-right: 1px solid var(--line);
      }
      .meta-grid div:last-child { border-right: 0; }
      dt {
        color: var(--muted);
        font-size: 0.76rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      dd {
        margin: 12px 0 0;
        font-weight: 800;
        line-height: 1.35;
      }
      .columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      section {
        padding: 28px;
      }
      section:first-child {
        border-right: 1px solid var(--line);
      }
      h3 {
        margin-bottom: 16px;
        font-size: 1.2rem;
      }
      ul {
        display: grid;
        gap: 12px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: grid;
        gap: 4px;
        border-top: 1px solid var(--line);
        padding-top: 12px;
      }
      .urgency {
        width: fit-content;
        border-radius: 999px;
        background: #111816;
        color: #ffffff;
        padding: 4px 8px;
        font-size: 0.7rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      li span, small {
        color: var(--muted);
        line-height: 1.45;
      }
      code {
        width: fit-content;
        border-radius: 6px;
        background: #edf2ed;
        padding: 3px 7px;
        color: var(--accent);
        font-weight: 900;
      }
      @media (max-width: 820px) {
        .hero,
        .action-board,
        .columns,
        .meta-grid {
          grid-template-columns: 1fr;
        }
        .meta-grid div,
        .action-intro,
        section:first-child {
          border-right: 0;
        }
        .action-intro {
          border-bottom: 1px solid var(--line);
        }
        .meta-grid div {
          border-bottom: 1px solid var(--line);
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header class="hero">
        <div>
          <p class="eyebrow">Local agent handoff</p>
          <h1>Know what it needs from you.</h1>
        </div>
        <p>A static owner-action report for autonomous agent projects: last run, current checkpoint, blocker, exact owner action, and next review window.</p>
      </header>
      <section class="action-board" aria-label="Owner actions">
        <div class="action-intro">
          <p class="eyebrow">Open owner actions</p>
          <strong>${openActions.length}</strong>
        </div>
        <div class="action-list">
          <h3>What the agent needs next</h3>
          ${renderOpenActions(openActions)}
        </div>
      </section>
      ${projects.map(renderProject).join("")}
    </main>
  </body>
</html>`;
}

function renderOpenActions(openActions) {
  if (openActions.length === 0) {
    return `<p>No owner action is open. The agent can keep working or wait for the next review window.</p>`;
  }

  return `<ul>${openActions
    .map(
      ({ project, action }) => `<li>
    <span class="urgency">${escapeHtml(action.urgency ?? "next")}</span>
    <strong>${escapeHtml(action.what ?? "Owner action required")}</strong>
    <small>${escapeHtml(project.name)} · ${escapeHtml(action.where ?? "Owner")} · due ${escapeHtml(action.needed_by ?? "unscheduled")}</small>
  </li>`
    )
    .join("")}</ul>`;
}

function renderProject(project) {
  const status = project.blocked ? "Blocked" : sentenceLabel(project.status ?? "working");
  const statusClass = project.blocked ? "" : " is-working";
  const nextReview = project.next_review
    ? `${project.next_review.date ?? "unscheduled"} · ${project.next_review.reason ?? "Review project state"}`
    : "None scheduled";

  return `
    <article class="project-card ${project.blocked ? "is-blocked" : "is-working"}">
      <div class="project-head">
        <div>
          <p class="eyebrow">${escapeHtml(project.blocked ? "waiting for owner" : "agent can continue")}</p>
          <h2>${escapeHtml(project.name ?? project.id ?? "Unnamed project")}</h2>
        </div>
        <span class="status-pill${statusClass}">${escapeHtml(status)}</span>
      </div>
      <dl class="meta-grid">
        <div>
          <dt>Last run</dt>
          <dd>${escapeHtml(project.last_run_at ?? "Unknown")}</dd>
        </div>
        <div>
          <dt>Checkpoint</dt>
          <dd>${escapeHtml(project.current_checkpoint ?? "No checkpoint recorded.")}</dd>
        </div>
        <div>
          <dt>Blocker</dt>
          <dd>${escapeHtml(project.blocker || "No blocker recorded.")}</dd>
        </div>
        <div>
          <dt>Next review</dt>
          <dd>${escapeHtml(nextReview)}</dd>
        </div>
      </dl>
      <div class="columns">
        <section>
          <h3>Owner actions</h3>
          ${renderProjectActions(project.owner_actions)}
        </section>
        <section>
          <h3>Recent commits</h3>
          ${renderCommits(project.recent_commits)}
        </section>
      </div>
    </article>
  `;
}

function renderProjectActions(actions = []) {
  if (actions.length === 0) {
    return `<p>No owner action recorded.</p>`;
  }

  return `<ul>${actions
    .map(
      (action) => `<li>
      <span class="urgency">${escapeHtml(action.urgency ?? "next")}</span>
      <strong>${escapeHtml(action.where ?? "Owner")}</strong>
      <span>${escapeHtml(action.what ?? "Action required.")}</span>
      <small>${escapeHtml(action.why ?? "No reason recorded.")} · needed by ${escapeHtml(action.needed_by ?? "unscheduled")}</small>
    </li>`
    )
    .join("")}</ul>`;
}

function renderCommits(commits = []) {
  if (commits.length === 0) {
    return `<p>No recent commit recorded.</p>`;
  }

  return `<ul>${commits
    .map(
      (commit) => `<li>
      <code>${escapeHtml(commit.hash ?? "unknown")}</code>
      <span>${escapeHtml(commit.message ?? "No commit message")}</span>
    </li>`
    )
    .join("")}</ul>`;
}

function urgencyRank(urgency) {
  switch (urgency) {
    case "now":
      return 0;
    case "next":
      return 1;
    default:
      return 2;
  }
}

function sentenceLabel(value) {
  return String(value)
    .replaceAll("_", " ")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
