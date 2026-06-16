# CodeQL Setup for `deepiri-landing`

This folder contains the CodeQL configuration used for security scanning in this repository.

## What each file does

- `.github/workflows/codeql.yml`
  - Defines when scans run and how GitHub Actions executes CodeQL.
- `.github/codeql/codeql-config.yml`
  - Defines which paths are ignored during analysis.

## CodeQL workflow breakdown (`.github/workflows/codeql.yml`)

### `name: CodeQL`

The display name shown in the GitHub Actions tab.

### `on.pull_request.branches` and `on.push.branches`

```yaml
on:
  pull_request:
    branches: [main, dev]
  push:
    branches: [main, dev]
```

Runs scans when pull requests target `main` or `dev`, and when commits are pushed to `main` or `dev`.

### `permissions`

```yaml
# CodeQL for deepiri-landing

This folder contains the CodeQL configuration and a short guide for running scans against this repository.

Files
- `.github/workflows/codeql.yml`: GitHub Actions workflow that initializes and runs CodeQL.
- `.github/codeql/codeql-config.yml`: CodeQL configuration (path excludes).

How the workflow runs
- The workflow triggers on `push` and `pull_request` targeting `main` and `dev`.
- The action initializes CodeQL for `javascript-typescript` and runs analysis.

Quick test options

1) Trigger via GitHub (recommended)
- Push a branch or open a PR against `main` or `dev`. The workflow will run automatically and show results in the Actions tab and Security alerts.

2) Enable manual runs
- If you want to run the workflow manually from the Actions UI, add `workflow_dispatch` to the `on:` section of `.github/workflows/codeql.yml`.

3) Run CodeQL locally (Linux/macOS)

```bash
# Download CodeQL CLI (example)
curl -sSL https://github.com/github/codeql-cli-binaries/releases/latest/download/codeql-linux64.zip -o codeql.zip
unzip codeql.zip -d codeql
export PATH="$PWD/codeql:$PATH"
codeql version

# Create a database and analyze (JavaScript/TypeScript)
codeql database create codeql-db --language=javascript --source-root=.
codeql database analyze codeql-db --format=sarif-latest --output=codeql-results.sarif
```

Notes and recommendations
- The workflow currently uses `languages: javascript-typescript`, which matches this TypeScript React repo.
- `.github/codeql/codeql-config.yml` excludes common build and vendor paths (node_modules, dist, build, coverage, logs, *.min.js) to reduce noise.
- The workflow sets `security-events: write` (required) and `fetch-depth: 0` for checkout (useful for analysis).
```
