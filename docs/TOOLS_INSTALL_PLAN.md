# Tools Install & Download Pages — Implementation Plan

**Owner:** @voungj321 (Jason Vuong)  
**Branch:** `jason_voung/feature/landing_repo_downloads` → merge into `dev`  
**Site:** [deepiri.com](https://deepiri.com) via [deepiri-landing](https://github.com/Team-Deepiri/deepiri-landing) (Cloudflare Pages)  
**Status:** Planning doc — implementation starts on this branch

---

## Mission

Add a **Tools** section to the Deepiri landing site so users can install every major Deepiri product from one place:

- **Terminal / CLI** — copy-paste commands or `curl | bash` one-liners
- **Desktop** — clickable download buttons (macOS, Linux, Windows) backed by GitHub Releases
- **Research integration** — each research project card gets an **Install** button linking to its tool page

This document is the single source of truth for scope, repos, phases, and acceptance criteria.

---

## Architecture

```
deepiri.com
├── /tools              ← catalog hub (all tools, filterable)
├── /tools/:slug        ← per-tool install page
└── /research           ← existing page + Install CTAs → /tools/:slug

Some tool repos
├── scripts/install.sh  ← curl | bash one-liner (subset only — see Phase 2A)
└── GitHub Releases     ← desktop installers (DMG, MSI, AppImage, etc.)

Most terminal tools
└── Landing digital terminal UI ← show real commands (setup.sh, poetry, docker, etc.)
```

### v1 hosting strategy

- **curl | bash installs (Phase 2A only):** `raw.githubusercontent.com/Team-Deepiri/{repo}/main/scripts/install.sh` — or existing root `install.sh` (polylogue, wooven)
- **Command-based installs (Phase 2B):** no new scripts in those repos — landing renders a styled **digital terminal** with copy-paste steps from each repo’s README / existing `setup.sh`
- **Desktop downloads:** `github.com/Team-Deepiri/{repo}/releases/latest/download/{asset}`
- **No Cloudflare Worker required for v1** — optional later for pretty URLs (`install.deepiri.com/emotion/mac`) and download analytics

---

## Your primary repo (landing UI)

Work **off branch `jason_voung/feature/landing_repo_downloads`** in:

| Repo | URL | Your work |
|------|-----|-----------|
| **deepiri-landing** | https://github.com/Team-Deepiri/deepiri-landing | Routes, components, catalog data, Research CTAs |

### New routes

| Route | Page | Purpose |
|-------|------|---------|
| `/tools` | `ToolsHub.tsx` | Grid of all tools; filter by CLI / Desktop / Platform |
| `/tools/:slug` | `ToolInstallPage.tsx` | Hero, terminal block, desktop downloads, GitHub link |

### New files (landing)

```
src/
├── data/toolsCatalog.ts
├── pages/ToolsHub.tsx
├── pages/ToolInstallPage.tsx
├── pages/ToolsHub.css
├── pages/ToolInstallPage.css
└── components/tools/
    ├── ToolCard.tsx
    ├── TerminalInstallBlock.tsx
    └── DesktopDownloadBlock.tsx
```

### Edit existing files

- `src/App.tsx` — add `/tools` and `/tools/:slug` routes
- `src/components/Header.tsx` — add **Tools** nav link (between Research and Contact)
- `src/pages/ResearchPage.tsx` — add **Install** button on project cards → `/tools/:slug`

### Data model (`toolsCatalog.ts`)

```ts
export type InstallMode = "terminal" | "desktop" | "both";

export interface ToolEntry {
  slug: string;
  name: string;
  tagline: string;
  repo: string;              // e.g. "Team-Deepiri/deepiri-zepgpu"
  installMode: InstallMode;
  tags: string[];
  terminal?: {
    /** "curl" = one-liner install.sh pipe; "commands" = digital terminal with step list */
    type: "curl" | "commands";
    oneLiner?: string;           // curl | bash (type === "curl")
    curlScript?: string;         // raw.githubusercontent.com/.../install.sh
    commands?: string[];         // lines shown in digital terminal (type === "commands")
    prerequisites?: string[];
    verifyCommand?: string;
  };
  desktop?: {
    productName: string;
    releaseRepo?: string;
    assets: { mac?: string; linux?: string; windows?: string };
    comingSoon?: boolean;
  };
  researchLink?: boolean;
}
```

### UI components

- **TerminalInstallBlock** — two modes:
  - **`curl` mode:** prominent `curl | bash` one-liner + copy button
  - **`commands` mode:** styled **digital terminal** (monospace, prompt prefix, dark panel) listing the exact commands to run — e.g. `git clone`, `./setup.sh`, `poetry install`, `docker compose up`. User copies each block; no new `install.sh` in those repos
- **DesktopDownloadBlock** — DMG / AppImage+deb / MSI buttons; show “Coming soon” when `comingSoon: true` until GH Release exists
- **ToolCard** — used on hub + optionally research page

---

## All 25 tools — install modes & repo links

Jason: you own the **landing pages** for all tools below. For terminal tools, most work is **landing-only** (digital terminal UI). Only the repos in **Phase 2A** need `install.sh` (or already have one). Phase 3 desktop release pipelines are separate PRs in those desktop repos.

| # | Tool | Slug | Mode | GitHub repo |
|---|------|------|------|-------------|
| 1 | Cyrex | `cyrex` | Terminal | https://github.com/Team-Deepiri/diri-cyrex |
| 2 | Helox | `helox` | Terminal | https://github.com/Team-Deepiri/deepiri-platform (submodule: `diri-helox`) |
| 3 | Agent Toolbox | `agent-toolbox` | Terminal | https://github.com/Team-Deepiri/diri-agent-toolbox |
| 4 | Training Orchestrator | `training-orchestrator` | Terminal | https://github.com/Team-Deepiri/deepiri-training-orchestrator |
| 5 | Dataset Processor | `dataset-processor` | Terminal | https://github.com/Team-Deepiri/deepiri-dataset-processor |
| 6 | Deepiri Emotion | `emotion` | **Both** (TUI + desktop) | https://github.com/Team-Deepiri/deepiri-emotion-desktop |
| 7 | MemoryMesh | `memorymesh` | Terminal | https://github.com/Team-Deepiri/deepiri-memorymesh |
| 8 | ZepGPU | `zepgpu` | Terminal | https://github.com/Team-Deepiri/deepiri-zepgpu |
| 9 | Renderflow Studio | `renderflow` | **Both** | https://github.com/Team-Deepiri/deepiri-renderflow-studio |
| 10 | Fuselk | `fuselk` | **Desktop only** | https://github.com/Team-Deepiri/deepiri-fuselk |
| 11 | Egottol | `egottol` | **Both** | https://github.com/Team-Deepiri/deepiri-egottol |
| 12 | GPU Utils | `gpu-utils` | Terminal | https://github.com/Team-Deepiri/deepiri-gpu-utils |
| 13 | Calliope | `calliope` | **Desktop only** | https://github.com/Team-Deepiri/deepiri-calliope |
| 14 | Polylogue | `polylogue` | Terminal | https://github.com/Team-Deepiri/deepiri-polylogue |
| 15 | Prismpipe | `prismpipe` | Terminal | https://github.com/Team-Deepiri/deepiri-prismpipe |
| 16 | Mudspeed | `mudspeed` | Terminal | https://github.com/Team-Deepiri/deepiri-mudspeed |
| 17 | Topolsea | `topolsea` | Terminal | https://github.com/Team-Deepiri/deepiri-topolsea |
| 18 | UQE | `uqe` | Terminal | https://github.com/Team-Deepiri/deepiri-uqe |
| 19 | Agent Guardrails | `agent-guardrails` | Terminal | https://github.com/Team-Deepiri/diri-agent-guardrails |
| 20 | Aarflingo | `aarflingo` | Terminal | https://github.com/Team-Deepiri/deepiri-aarflingo |
| 21 | Wooven | `wooven` | Terminal | https://github.com/Team-Deepiri/deepiri-wooven |
| 22 | Tombstone | `tombstone` | Terminal | https://github.com/Team-Deepiri/deepiri-tombstone |
| 23 | Voxier | `voxier` | **Desktop only** | https://github.com/Team-Deepiri/deepiri-voxier |
| 24 | Ollama Utils | `ollama-utils` | Terminal + packaged file | https://github.com/Team-Deepiri/deepiri-ollama-utils |
| 25 | Deepiri Platform | `platform` | Terminal (Docker) | https://github.com/Team-Deepiri/deepiri-platform |

**Mode key:** Terminal = CLI/curl install section | Desktop = clickable installer buttons | Both = both sections on the page.

---

## Repos you will touch (by phase)

### Phase 1 — Landing UI for every tool (start here)

| Repo | URL | What to do |
|------|-----|------------|
| deepiri-landing | https://github.com/Team-Deepiri/deepiri-landing | Full UI: `/tools`, `/tools/:slug`, catalog, Research CTAs |

**You must build landing components for all 25 tools** — not just the hub. Each tool gets a working `/tools/:slug` page assembled from shared components + its catalog entry:

| Component | Scope |
|-----------|--------|
| `ToolsHub.tsx` | Grid listing all 25 tools |
| `ToolInstallPage.tsx` | Dynamic page driven by `slug` from `toolsCatalog.ts` |
| `ToolCard.tsx` | Card used on hub (and optionally research) |
| `TerminalInstallBlock.tsx` | Per-tool: curl mode **or** digital-terminal mode |
| `DesktopDownloadBlock.tsx` | Per-tool: download buttons where `installMode` includes desktop |
| `toolsCatalog.ts` | **One entry per tool** — name, tagline, repo link, terminal commands, desktop assets |

There is no shortcut of “only building a few pages.” Every slug in the catalog must render a complete install experience when you visit `/tools/{slug}`.

### Phase 2 — Terminal installs

**Important:** Jason is **not** adding `install.sh` to every repo. Phase 2 splits into two tracks.

#### Phase 2A — You must **create** `install.sh` in these repos (+ landing curl UI)

For **8 repos below**, open a PR in that repo and **author a real `scripts/install.sh`** (idempotent, `--help`, detects OS, installs deps, verifies install). Do not skip this — the landing `curl | bash` block is useless until the script exists on `main`.

Wooven and Polylogue already have root `install.sh` — point the landing curl URL at those existing files (or add `scripts/install.sh` that delegates to them).

After each script merges, wire the matching tool entry in `toolsCatalog.ts` and confirm `TerminalInstallBlock` (curl mode) on that tool’s landing page.

```bash
curl -fsSL https://raw.githubusercontent.com/Team-Deepiri/{repo}/main/scripts/install.sh | bash
```

| Tool | Repo | URL | **Your action — create the script** |
|------|------|-----|-------------------------------------|
| Agent Toolbox | diri-agent-toolbox | https://github.com/Team-Deepiri/diri-agent-toolbox | **Create** `scripts/install.sh` |
| Prismpipe | deepiri-prismpipe | https://github.com/Team-Deepiri/deepiri-prismpipe | **Create** `scripts/install.sh` |
| GPU Utils | deepiri-gpu-utils | https://github.com/Team-Deepiri/deepiri-gpu-utils | **Create** `scripts/install.sh` |
| Ollama Utils | deepiri-ollama-utils | https://github.com/Team-Deepiri/deepiri-ollama-utils | **Create** `scripts/install.sh` + attach wheel/zip to GitHub Release |
| Agent Guardrails | diri-agent-guardrails | https://github.com/Team-Deepiri/diri-agent-guardrails | **Create** `scripts/install.sh` |
| Wooven | deepiri-wooven | https://github.com/Team-Deepiri/deepiri-wooven | Script exists — **wire landing** to root `install.sh` |
| MemoryMesh | deepiri-memorymesh | https://github.com/Team-Deepiri/deepiri-memorymesh | **Create** `scripts/install.sh` |
| Dataset Processor | deepiri-dataset-processor | https://github.com/Team-Deepiri/deepiri-dataset-processor | **Create** `scripts/install.sh` |
| Training Orchestrator | deepiri-training-orchestrator | https://github.com/Team-Deepiri/deepiri-training-orchestrator | **Create** `scripts/install.sh` |
| Polylogue | deepiri-polylogue | https://github.com/Team-Deepiri/deepiri-polylogue | Script exists — **wire landing** to root `install.sh` |

**`install.sh` checklist (each new script):**
- [ ] `set -euo pipefail`, `--help` / `--dry-run` flags
- [ ] Checks Python/poetry/pip/docker prerequisites with clear errors
- [ ] Installs the package (pip, poetry, or venv)
- [ ] Prints a verify command at the end (e.g. `deepiri-gpu detect --json`)
- [ ] Tested locally on Linux; document macOS gaps in script comments if any
- [ ] Separate PR merged in that repo **before** landing curl URL goes live

#### Phase 2B — Digital terminal on landing only (no new install.sh)

For these tools, **do not add `install.sh`**. Instead, **create the landing page entry + digital terminal component content** for each tool — populate `toolsCatalog.ts` with the exact command lines and render them via `TerminalInstallBlock` (`terminal.type: "commands"`).

| Tool | Slug | Repo | Commands to show in digital terminal |
|------|------|------|--------------------------------------|
| Deepiri Platform | `platform` | https://github.com/Team-Deepiri/deepiri-platform | `git clone` → `git submodule update --init --recursive` → `docker compose -f docker-compose.dev.yml up -d` |
| Cyrex | `cyrex` | https://github.com/Team-Deepiri/diri-cyrex | Clone platform or cyrex → `docker compose` up AI stack, or `poetry install` for local dev |
| Helox | `helox` | https://github.com/Team-Deepiri/deepiri-platform (`diri-helox`) | `git submodule update --init diri-helox` → `cd diri-helox` → `poetry install` |
| Mudspeed | `mudspeed` | https://github.com/Team-Deepiri/deepiri-mudspeed | `git clone` → `bash .setup.sh` → `bash .train.sh` |
| Topolsea | `topolsea` | https://github.com/Team-Deepiri/deepiri-topolsea | `git clone` → `cargo build --release` → `poetry install` |
| UQE | `uqe` | https://github.com/Team-Deepiri/deepiri-uqe | `git clone` → `poetry install` (or `pip install -r requirements.txt`) |
| Aarflingo | `aarflingo` | https://github.com/Team-Deepiri/deepiri-aarflingo | `git clone` → `./setup.sh --run` |
| Tombstone | `tombstone` | https://github.com/Team-Deepiri/deepiri-tombstone | `git clone` → `./setup.sh` (builds + Ollama Docker + model pull) |
| ZepGPU | `zepgpu` | https://github.com/Team-Deepiri/deepiri-zepgpu | `git clone` → `poetry install` → `cd docker && docker-compose up -d` |
| Emotion (TUI) | `emotion` | https://github.com/Team-Deepiri/deepiri-emotion-desktop | `git clone` → `npm install` → `npm run cli` (desktop = Phase 3 downloads) |
| Egottol | `egottol` | https://github.com/Team-Deepiri/deepiri-egottol | `git clone` → `./setup.sh` or `poetry install` + `cmake -B build` + `poetry run python -m egottol.ui.main` |

**Digital terminal UX requirements (Phase 2B):**
- Dark panel, monospace font, `$` prompt prefix per line
- Copy-all and copy-per-block buttons
- Optional OS tabs if macOS vs Linux commands differ
- Pull command text from each repo README — accuracy over uniformity

### Phase 3 — Desktop release pipelines (parallel PRs per repo)

| Priority | Repo | URL | Packager |
|----------|------|-----|----------|
| P0 | deepiri-emotion-desktop | https://github.com/Team-Deepiri/deepiri-emotion-desktop | electron-builder (config exists) + `release.yml` |
| P1 | deepiri-voxier | https://github.com/Team-Deepiri/deepiri-voxier | Godot export CI → zip/dmg/exe |
| P1 | deepiri-fuselk | https://github.com/Team-Deepiri/deepiri-fuselk | PyInstaller PySide6 + `release.yml` |
| P2 | deepiri-egottol | https://github.com/Team-Deepiri/deepiri-egottol | PyInstaller + C++ core + `release.yml` |
| P3 | deepiri-renderflow-studio | https://github.com/Team-Deepiri/deepiri-renderflow-studio | Tauri (`apps/desktop-tauri`) + `release.yml` |
| P3 | deepiri-calliope | https://github.com/Team-Deepiri/deepiri-calliope | Tauri/Electron shell — needs product decision (Docker vs bundled) |

**Emotion desktop** already has electron-builder targets in `package.json` (NSIS, DMG, deb, AppImage). Add `.github/workflows/release.yml` to publish on tag/release.

**ZepGPU** is **terminal-only** for v1 — install via Docker Compose on the landing digital terminal. No GitHub Release desktop pipeline or `DesktopDownloadBlock` for this tool.

**Renderflow** Tauri config: `apps/desktop-tauri/src-tauri/tauri.conf.json` — needs icons + release workflow.

---

## Implementation phases (recommended order)

### Phase 1 — Landing UX ← **Jason starts here**

1. Stay on `jason_voung/feature/landing_repo_downloads`
2. Add `toolsCatalog.ts` with **all 25 entries** (`desktop.comingSoon: true` where no release yet)
3. Build shared components (`ToolsHub`, `ToolInstallPage`, `ToolCard`, `TerminalInstallBlock`, `DesktopDownloadBlock`)
4. **Every tool must have a working `/tools/:slug` page** using those components + its catalog data
5. Wire Header nav + Research Install CTAs for each linked tool
6. Match existing CSS patterns (`ResearchPage.css`, `Header.css`, etc.)

### Phase 2 — Terminal installs (runs in parallel with Phase 1 landing pages)

- **2A (8 scripts to create + 2 existing):** open PRs in each repo and **write `scripts/install.sh`**; then wire curl UI on that tool’s landing page
- **2B (11 tools):** landing-only — **create digital terminal content** per tool in catalog; no repo PRs unless README is wrong. **Deepiri Platform** uses Docker Compose commands on the landing page (no `install.sh`).

### Phase 3 — Desktop releases

Ship GH Releases per desktop repo. Flip `comingSoon: false` and set `desktop.assets` URLs in `toolsCatalog.ts` as each release goes live.

### Phase 4 — Optional Cloudflare Worker

Only if we need `install.deepiri.com/{slug}/{os}` pretty URLs or download analytics. Not blocking v1.

---

## Per-tool page content checklist

Each `/tools/:slug` page should include:

1. **Hero** — name, tagline, tags (CLI / Desktop / Platform)
2. **GitHub link** — `https://github.com/{repo}`
3. **Terminal section** (if `terminal` or `both`):
   - Prerequisites
   - **curl mode:** one-line `curl | bash` + copy button
   - **commands mode:** digital terminal with step-by-step commands + copy buttons
   - Verify command where applicable (e.g. `deepiri-gpu doctor`, `./deepiri-tombstone ping`)
4. **Desktop section** (if `desktop` or `both`):
   - macOS / Linux / Windows download buttons
   - “Coming soon” state until Release exists
5. **Related** — link back to `/research` if `researchLink: true`

---

## GitHub Releases URL pattern

```
https://github.com/Team-Deepiri/{repo}/releases/latest/download/{asset-filename}
```

Example (Emotion, once released):

```
https://github.com/Team-Deepiri/deepiri-emotion-desktop/releases/latest/download/Deepiri-Emotion-1.0.0-arm64.dmg
```

Optional v1.5: build script that calls `api.github.com/repos/.../releases/latest` at build time to auto-fill asset URLs.

---

## Risks & decisions (read before Phase 3)

| Topic | Decision needed |
|-------|-----------------|
| **ZepGPU** | Terminal/Docker only — no desktop installer or Phase 3 release pipeline in v1 |
| **Calliope desktop** | Docker-first today (Postgres + Ollama). Desktop installer = Electron/Tauri shell + Docker prerequisite, or slim local mode? |
| **Cyrex / Helox / Platform** | Platform services — pages lead with Docker Compose from `deepiri-platform`, not a curl one-liner or single binary |
| **Ollama Utils** | Package as wheel/zip on GitHub Releases; landing links direct download + pip/git fallback |
| **Topolsea** | Landing shows `cargo` + `poetry` commands; no install.sh in v1 |
| **PyPI** | Phase 2A curl scripts may wrap pip; Phase 2B shows raw README commands |

---

## Success criteria

- [ ] `/tools` lists all 25 tools with correct install-mode badges
- [ ] **All 25** `/tools/:slug` pages render with correct components (curl, digital terminal, and/or desktop block)
- [ ] `toolsCatalog.ts` has a complete entry for every tool
- [ ] Research project cards link to install pages
- [ ] Desktop tools show download buttons (or “Coming soon”) per OS
- [ ] **Phase 2A: `scripts/install.sh` created and merged** in 8 repos; Wooven + Polylogue wired to existing scripts
- [ ] Phase 2A landing pages: `curl | bash` one-liner tested against live scripts on `main`
- [ ] Phase 2B landing pages: digital terminal shows accurate README/setup.sh commands per tool
- [ ] PR merges to `dev`; Cloudflare Pages preview works on PR
- [ ] No Cloudflare Worker required for v1 launch

---

## Jason’s work checklist (at a glance)

| # | Work item | Count |
|---|-----------|-------|
| 1 | Landing components + `/tools` hub | 1 hub page |
| 2 | Per-tool `/tools/:slug` pages via catalog | **25 pages** |
| 3 | `toolsCatalog.ts` entries | **25 entries** |
| 4 | **Create** `scripts/install.sh` in repo + PR | **8 repos** |
| 5 | Wire existing `install.sh` on landing | **2 repos** (wooven, polylogue) |
| 6 | Digital terminal catalog content + UI | **11 tools** (Phase 2B, incl. platform) |
| 7 | Desktop download blocks (coming soon OK) | **6 desktop/both tools** (ZepGPU excluded — terminal only) |

---

## Local dev

```bash
git clone git@github.com:Team-Deepiri/deepiri-landing.git
cd deepiri-landing
git checkout jason_voung/feature/landing_repo_downloads
npm install
npm run dev    # http://localhost:5174
```

---

## Questions?

Ping the team on this PR or in Slack. This branch (`jason_voung/feature/landing_repo_downloads`) is **your** working branch — commit here and keep the PR open against `dev` until ready for review.
