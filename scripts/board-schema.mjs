const projectStatuses = new Set(["working", "waiting_for_owner", "waiting_for_data", "blocked", "parked"]);
const actionStatuses = new Set(["open", "in_progress", "done"]);
const actionUrgencies = new Set(["now", "next", "later"]);

export function assertBoard(board, source = "board data") {
  const errors = validateBoard(board);
  if (errors.length > 0) {
    throw new Error(`${source} failed validation:\n- ${errors.join("\n- ")}`);
  }
}

export function validateBoard(board) {
  const errors = [];

  if (!isObject(board)) {
    return ["root must be a JSON object"];
  }

  if (board.version !== 1) {
    errors.push("version must be 1");
  }

  requireString(board, "generated_at", errors);

  if (!Array.isArray(board.projects)) {
    errors.push("projects must be an array");
    return errors;
  }

  board.projects.forEach((project, index) => {
    validateProject(project, `projects[${index}]`, errors);
  });

  return errors;
}

function validateProject(project, path, errors) {
  if (!isObject(project)) {
    errors.push(`${path} must be an object`);
    return;
  }

  for (const field of ["id", "name", "status", "last_run_at", "current_checkpoint"]) {
    requireString(project, `${path}.${field}`, errors);
  }

  if (typeof project.status === "string" && !projectStatuses.has(project.status)) {
    errors.push(`${path}.status must be one of ${Array.from(projectStatuses).join(", ")}`);
  }

  if (typeof project.blocked !== "boolean") {
    errors.push(`${path}.blocked must be a boolean`);
  }

  if (project.blocked === true) {
    requireString(project, `${path}.blocker`, errors);
  }

  if (project.blocked === false && project.blocker) {
    errors.push(`${path}.blocker must be blank when blocked is false`);
  }

  if (!Array.isArray(project.owner_actions)) {
    errors.push(`${path}.owner_actions must be an array`);
  } else {
    project.owner_actions.forEach((action, index) => {
      validateOwnerAction(action, `${path}.owner_actions[${index}]`, errors);
    });
  }

  if (project.recent_commits !== undefined) {
    if (!Array.isArray(project.recent_commits)) {
      errors.push(`${path}.recent_commits must be an array`);
    } else {
      project.recent_commits.forEach((commit, index) => validateCommit(commit, `${path}.recent_commits[${index}]`, errors));
    }
  }

  if (!isObject(project.next_review)) {
    errors.push(`${path}.next_review must be an object`);
  } else {
    requireString(project.next_review, `${path}.next_review.date`, errors);
    requireString(project.next_review, `${path}.next_review.reason`, errors);
  }
}

function validateOwnerAction(action, path, errors) {
  if (!isObject(action)) {
    errors.push(`${path} must be an object`);
    return;
  }

  for (const field of ["id", "status", "urgency", "needed_by", "where", "what", "why"]) {
    requireString(action, `${path}.${field}`, errors);
  }

  if (typeof action.status === "string" && !actionStatuses.has(action.status)) {
    errors.push(`${path}.status must be one of ${Array.from(actionStatuses).join(", ")}`);
  }

  if (typeof action.urgency === "string" && !actionUrgencies.has(action.urgency)) {
    errors.push(`${path}.urgency must be one of ${Array.from(actionUrgencies).join(", ")}`);
  }
}

function validateCommit(commit, path, errors) {
  if (!isObject(commit)) {
    errors.push(`${path} must be an object`);
    return;
  }

  for (const field of ["hash", "message", "created_at"]) {
    requireString(commit, `${path}.${field}`, errors);
  }
}

function requireString(object, path, errors) {
  const field = path.split(".").at(-1);
  if (typeof object[field] !== "string" || object[field].trim() === "") {
    errors.push(`${path} must be a non-empty string`);
  }
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
