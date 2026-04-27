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
permissions:
  actions: read
  contents: read
  security-events: write
```

Uses least-privilege permissions. `security-events: write` is required so CodeQL can upload findings.

### Language setup

```yaml
with:
  languages: javascript-typescript
```

This repository is a Vite React app built with TypeScript, so CodeQL is configured to analyze JavaScript and TypeScript.

### Checkout step

```yaml
with:
  fetch-depth: 0
```

- `fetch-depth: 0` keeps full git history, which is a safe default for analysis and troubleshooting.

### Initialize CodeQL

```yaml
uses: github/codeql-action/init@v3
with:
  config-file: ./.github/codeql/codeql-config.yml
```

Starts the CodeQL engine and loads the config file in this folder.

### Analyze

```yaml
uses: github/codeql-action/analyze@v3
```

Executes the CodeQL queries and uploads the results to GitHub Security.

## Config breakdown (`.github/codeql/codeql-config.yml`)

### `paths-ignore`

Generated, build, and runtime artifact paths are excluded to reduce noise and keep scans focused on source code:

```yaml
paths-ignore:
  - '**/node_modules/**'
  - '**/dist/**'
  - '**/dist-ssr/**'
  - '**/build/**'
  - '**/coverage/**'
  - '**/logs/**'
  - '**/*.min.js'
```

## Best practices

1. Keep trigger scope intentional.
   Use branch filters such as `main` and `dev` to control scan cost and noise.
2. Keep language scope explicit.
   Only include languages that are actually used in this repository.
3. Exclude generated and vendor artifacts.
   Keep dependencies, build outputs, caches, logs, and minified assets out of CodeQL analysis.
4. Use stable action versions.
   `@v3` is the current stable major for the CodeQL actions used here.
5. Review alerts regularly.
   Triage high-priority findings first and suppress only with documented reasoning.

## Maintenance examples

### Add another generated folder

If the build process introduces a new generated directory, add it to `paths-ignore`:

```yaml
- '**/generated/**'
```

### Keep the language list aligned with the repo

If the repository adds another supported source language later, update the workflow `languages` setting accordingly.

### Keep ignore rules focused on this project

The current ignore list already covers the main output folders for this repo, including `dist` and `dist-ssr`. Add only project-specific build artifacts that are actually present in this checkout.
