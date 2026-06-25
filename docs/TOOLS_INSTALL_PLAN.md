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
| 8 | ZepGPU | `zepgpu` | **Both** | https://github.com/Team-Deepiri/deepiri-zepgpu |
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

### Phase 1 — Landing only (start here)

| Repo | URL | What to do |
|------|-----|------------|
| deepiri-landing | https://github.com/Team-Deepiri/deepiri-landing | Full UI: `/tools`, `/tools/:slug`, catalog, Research CTAs |

### Phase 2 — Terminal installs

**Important:** Jason is **not** adding `install.sh` to every repo. Phase 2 splits into two tracks.

#### Phase 2A — `curl | bash` install scripts (repo PRs only for this list)

Add or wire `scripts/install.sh` in **these repos only**. Landing uses `terminal.type: "curl"`.

```bash
curl -fsSL https://raw.githubusercontent.com/Team-Deepiri/{repo}/main/scripts/install.sh | bash
```

| Tool | Repo | URL | Notes |
|------|------|-----|-------|
| Platform | deepiri-platform | https://github.com/Team-Deepiri/deepiri-platform | Add `scripts/install.sh` (Docker Compose bootstrap) |
| Agent Toolbox | diri-agent-toolbox | https://github.com/Team-Deepiri/diri-agent-toolbox | Add `scripts/install.sh` |
| Prismpipe | deepiri-prismpipe | https://github.com/Team-Deepiri/deepiri-prismpipe | Add `scripts/install.sh` |
| GPU Utils | deepiri-gpu-utils | https://github.com/Team-Deepiri/deepiri-gpu-utils | Add `scripts/install.sh` |
| Ollama Utils | deepiri-ollama-utils | https://github.com/Team-Deepiri/deepiri-ollama-utils | Add `scripts/install.sh` + packaged wheel/zip on Releases |
| Agent Guardrails | diri-agent-guardrails | https://github.com/Team-Deepiri/diri-agent-guardrails | Add `scripts/install.sh` |
| Wooven | deepiri-wooven | https://github.com/Team-Deepiri/deepiri-wooven | **Already has** root `install.sh` — link to it |
| MemoryMesh | deepiri-memorymesh | https://github.com/Team-Deepiri/deepiri-memorymesh | Add `scripts/install.sh` |
| Dataset Processor | deepiri-dataset-processor | https://github.com/Team-Deepiri/deepiri-dataset-processor | Add `scripts/install.sh` |
| Training Orchestrator | deepiri-training-orchestrator | https://github.com/Team-Deepiri/deepiri-training-orchestrator | Add `scripts/install.sh` |
| Polylogue | deepiri-polylogue | https://github.com/Team-Deepiri/deepiri-polylogue | **Already has** root `install.sh` — link to it |

#### Phase 2B — Digital terminal on landing only (no new install.sh)

For these tools, **do not add `install.sh`**. Build the **digital terminal UI** on the landing page with the real setup commands from each repo’s README or existing scripts. Use `terminal.type: "commands"` in `toolsCatalog.ts`.

| Tool | Slug | Repo | Commands to show in digital terminal |
|------|------|------|--------------------------------------|
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
| P2 | deepiri-zepgpu | https://github.com/Team-Deepiri/deepiri-zepgpu | CLI installer + optional desktop wrapper |
| P3 | deepiri-renderflow-studio | https://github.com/Team-Deepiri/deepiri-renderflow-studio | Tauri (`apps/desktop-tauri`) + `release.yml` |
| P3 | deepiri-calliope | https://github.com/Team-Deepiri/deepiri-calliope | Tauri/Electron shell — needs product decision (Docker vs bundled) |

**Emotion desktop** already has electron-builder targets in `package.json` (NSIS, DMG, deb, AppImage). Add `.github/workflows/release.yml` to publish on tag/release.

**Renderflow** Tauri config: `apps/desktop-tauri/src-tauri/tauri.conf.json` — needs icons + release workflow.

---

## Implementation phases (recommended order)

### Phase 1 — Landing UX ← **Jason starts here**

1. Stay on `jason_voung/feature/landing_repo_downloads`
2. Add `toolsCatalog.ts` with all 25 entries (`desktop.comingSoon: true` where no release yet)
3. Build hub + per-tool pages + shared components
4. Wire Header nav + Research Install CTAs
5. Match existing CSS patterns (`ResearchPage.css`, `Header.css`, etc.)
6. Open PR → `dev`

### Phase 2 — Terminal installs

- **2A (11 repos):** open PRs only for the install-script list above; landing shows `curl | bash`
- **2B (10 tools):** landing-only — digital terminal with existing setup commands; **no repo changes** unless README is wrong

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
| **Calliope desktop** | Docker-first today (Postgres + Ollama). Desktop installer = Electron/Tauri shell + Docker prerequisite, or slim local mode? |
| **Cyrex / Helox** | Platform services — pages should lead with Docker Compose from `deepiri-platform`, not imply a single binary |
| **Ollama Utils** | Package as wheel/zip on GitHub Releases; landing links direct download + pip/git fallback |
| **Topolsea** | Landing shows `cargo` + `poetry` commands; no install.sh in v1 |
| **PyPI** | Phase 2A curl scripts may wrap pip; Phase 2B shows raw README commands |

---

## Success criteria

- [ ] `/tools` lists all 25 tools with correct install-mode badges
- [ ] Every tool has `/tools/:slug` with accurate terminal instructions
- [ ] Research project cards link to install pages
- [ ] Desktop tools show download buttons (or “Coming soon”) per OS
- [ ] Phase 2A tools: `curl | bash` one-liner wired to install.sh
- [ ] Phase 2B tools: digital terminal shows accurate README/setup.sh commands (no new install.sh)
- [ ] PR merges to `dev`; Cloudflare Pages preview works on PR
- [ ] No Cloudflare Worker required for v1 launch

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
