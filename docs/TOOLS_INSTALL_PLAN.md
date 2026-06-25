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

Per-tool GitHub repos
├── scripts/install.sh  ← terminal install (curl | bash)
└── GitHub Releases     ← desktop installers (DMG, MSI, AppImage, etc.)
```

### v1 hosting strategy

- **Terminal installs:** `raw.githubusercontent.com/Team-Deepiri/{repo}/main/scripts/install.sh`
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
    oneLiner: string;
    curlScript?: string;
    pipPackage?: string;
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

- **TerminalInstallBlock** — OS tabs (macOS / Linux / Windows), copy button, prerequisites, expandable “Advanced” manual steps
- **DesktopDownloadBlock** — DMG / AppImage+deb / MSI buttons; show “Coming soon” when `comingSoon: true` until GH Release exists
- **ToolCard** — used on hub + optionally research page

---

## All 25 tools — install modes & repo links

Jason: you own the **landing pages** for all tools below. You will also coordinate (or open PRs in) the per-repo install scripts and release pipelines listed in **Repo work**.

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

### Phase 2 — Terminal install scripts (parallel PRs per repo)

Add `scripts/install.sh` (and `scripts/install.ps1` on Windows where needed). Standard one-liner on landing:

```bash
curl -fsSL https://raw.githubusercontent.com/Team-Deepiri/{repo}/main/scripts/install.sh | bash
```

| Repo | URL | Notes |
|------|-----|-------|
| diri-cyrex | https://github.com/Team-Deepiri/diri-cyrex | Docker Compose + local poetry dev |
| deepiri-platform | https://github.com/Team-Deepiri/deepiri-platform | Helox lives in `diri-helox` submodule |
| diri-agent-toolbox | https://github.com/Team-Deepiri/diri-agent-toolbox | pip / poetry |
| deepiri-training-orchestrator | https://github.com/Team-Deepiri/deepiri-training-orchestrator | pip install |
| deepiri-dataset-processor | https://github.com/Team-Deepiri/deepiri-dataset-processor | poetry |
| deepiri-memorymesh | https://github.com/Team-Deepiri/deepiri-memorymesh | pip install memorymesh |
| deepiri-gpu-utils | https://github.com/Team-Deepiri/deepiri-gpu-utils | pip install |
| deepiri-polylogue | https://github.com/Team-Deepiri/deepiri-polylogue | **Already has** root `install.sh` — link to it |
| deepiri-prismpipe | https://github.com/Team-Deepiri/deepiri-prismpipe | poetry / pip |
| deepiri-mudspeed | https://github.com/Team-Deepiri/deepiri-mudspeed | wrap existing `.setup.sh` |
| deepiri-topolsea | https://github.com/Team-Deepiri/deepiri-topolsea | Rust + Python (cargo + poetry) |
| deepiri-uqe | https://github.com/Team-Deepiri/deepiri-uqe | poetry / pip |
| diri-agent-guardrails | https://github.com/Team-Deepiri/diri-agent-guardrails | pip install |
| deepiri-aarflingo | https://github.com/Team-Deepiri/deepiri-aarflingo | wrap `setup.sh` |
| deepiri-wooven | https://github.com/Team-Deepiri/deepiri-wooven | **Already has** root `install.sh` — link to it |
| deepiri-tombstone | https://github.com/Team-Deepiri/deepiri-tombstone | wrap `setup.sh` + make |
| deepiri-zepgpu | https://github.com/Team-Deepiri/deepiri-zepgpu | poetry + docker compose |
| deepiri-ollama-utils | https://github.com/Team-Deepiri/deepiri-ollama-utils | install.sh + wheel/zip on Releases |

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

### Phase 2 — Terminal scripts

Open separate PRs in each Phase 2 repo. Priority: tools that already have `install.sh` (polylogue, wooven) → simple pip packages → platform-heavy (cyrex, helox, tombstone).

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
   - One-line `curl | bash`
   - Copy button
   - Expandable manual install
   - Verify command (e.g. `deepiri-gpu doctor`, `fuselk doctor`)
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
| **Topolsea** | Rust toolchain in install script; consider publishing wheels later |
| **PyPI** | Many packages are git-only today — v1 uses curl scripts; PyPI is a later convenience |

---

## Success criteria

- [ ] `/tools` lists all 25 tools with correct install-mode badges
- [ ] Every tool has `/tools/:slug` with accurate terminal instructions
- [ ] Research project cards link to install pages
- [ ] Desktop tools show download buttons (or “Coming soon”) per OS
- [ ] Terminal installs documented via `curl | bash` or existing `install.sh`
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
