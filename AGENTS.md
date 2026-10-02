# Workspace Boundary Policy

## 1. Authoritative Workspace Root

The authoritative `WORKSPACE_ROOT` is the directory containing this `AGENTS.md`.
All normal project operations MUST remain inside `WORKSPACE_ROOT/**`.

## 2. Default Deny

By default, the agent MUST NOT inspect or enumerate parent, ancestor, or sibling directories; inspect sibling repositories; search, read, write, or hash files outside `WORKSPACE_ROOT`; or discover repositories outside `WORKSPACE_ROOT`. Read-only access is still access.

## 3. Parent Traversal

The agent MUST NOT use parent traversal for discovery, including `..`, `../`, `..\`, `Get-ChildItem ..`, `rg ... ..`, or `git -C ..`.

Do not search parent directories for `.git`, `AGENTS.md`, project configuration, repositories, or source files. If required information does not exist in `WORKSPACE_ROOT`, STOP and return `EXTERNAL_PATH_ACCESS_REQUIRED`.

## 4. Git Boundary

Before repository operations, first verify locally from `WORKSPACE_ROOT` with `Test-Path .git`. If `.git` is not present directly in `WORKSPACE_ROOT`, STOP and return `WORKSPACE_BOUNDARY_MISMATCH`. Do not use Git parent discovery to diagnose the problem.

Only after local `.git` is confirmed may `git rev-parse --show-toplevel` be used. Normalize its result and require it to equal `WORKSPACE_ROOT`; otherwise STOP.

## 5. External Path Authorization

External paths are DENIED by default.

```text
EXTERNAL_READ_ALLOWLIST:
- NONE

EXTERNAL_WRITE_ALLOWLIST:
- NONE
```

External access is permitted only when the CURRENT user task explicitly authorizes an exact path or subtree. Authorization is explicit, path-scoped, operation-scoped, Stage-scoped, and non-persistent. Authorization from a previous Stage MUST NOT carry over.

For example, read authorization for `C:\local\temp` does not authorize `C:\local`, `C:\`, sibling paths, or writes to `C:\local\temp`. Read permission never implies write permission.

## 6. Path Resolution

Symbolic links, junctions, aliases, mounts, and other path indirection MUST NOT be used to escape the authorized workspace. If the effective resolved target is outside `WORKSPACE_ROOT` or the current explicit allowlist, STOP and return `EXTERNAL_PATH_RESOLUTION_DENIED`.

## 7. Secrets

Never print, persist, commit, or include in RESULT, VALIDATION, or REVIEW: API keys, bearer tokens, Authorization headers, cookies, passwords, Site credentials, or ephemeral credentials. Redact secret values in displayed commands.

## 8. Human Approval

When access outside `WORKSPACE_ROOT` is required, STOP and return `EXTERNAL_PATH_ACCESS_REQUIRED`. Include only:

1. Exact requested path
2. READ or WRITE
3. Reason
4. Minimum required scope

Wait for explicit Human Approval before accessing that path.
