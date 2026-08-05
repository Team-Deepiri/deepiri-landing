export type InstallMode = 'terminal' | 'desktop' | 'both';
export type TerminalOs = 'linux' | 'mac' | 'windows';

export interface ToolEntry {
  slug: string;
  name: string;
  tagline: string;
  repo: string;
  installMode: InstallMode;
  tags: string[];
  terminal?: {
    type: 'curl' | 'commands';
    oneLiner?: string;
    curlScript?: string;
    commands?: string[];
    /** When macOS vs Linux (or Windows) steps differ, provide per-OS command lists. */
    commandsByOs?: Partial<Record<TerminalOs, string[]>>;
    prerequisites?: string[];
    verifyCommand?: string;
  };
  desktop?: {
    productName: string;
    releaseRepo?: string;
    assets: { mac?: string; linux?: string; windows?: string };
    comingSoon?: boolean;
    prerequisites?: string[];
  };
  /** Packaged file download (e.g. Ollama Utils wheel on GitHub Releases). */
  package?: {
    label: string;
    releaseRepo: string;
    asset: string;
    /** Shown under the download button (pip/git fallback). */
    fallbackCommands?: string[];
  };
  researchLink?: boolean;
}

function curlInstall(
  repo: string,
  scriptPath = 'scripts/install.sh',
): Pick<NonNullable<ToolEntry['terminal']>, 'type' | 'oneLiner' | 'curlScript'> {
  const url = `https://raw.githubusercontent.com/${repo}/main/${scriptPath}`;
  return {
    type: 'curl',
    oneLiner: `curl -fsSL ${url} | bash`,
    curlScript: url,
  };
}

export const toolsCatalog: ToolEntry[] = [
  {
    slug: 'cyrex',
    name: 'Cyrex',
    tagline: 'Cyrex agentic runtime framework.',
    repo: 'Team-Deepiri/diri-cyrex',
    installMode: 'terminal',
    tags: ['CLI', 'Platform', 'AI/ML'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Docker & Docker Compose v2', 'Git', '8GB+ RAM recommended'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-platform.git',
        'cd deepiri-platform',
        'git submodule update --init --recursive',
        '# AI team stack (recommended):',
        'cd team_dev_environments/ai-team',
        './build.sh && ./start.sh',
        '# Or Cyrex services only from platform root:',
        'cd ../..',
        'docker compose -f docker-compose.dev.yml up -d postgres redis influxdb etcd minio milvus cyrex cyrex-interface ollama synapse synapse-sugar-glider',
        '# Local Cyrex dev (separate repo):',
        '# git clone https://github.com/Team-Deepiri/diri-cyrex.git && cd diri-cyrex',
        '# cp .env.example .env && python -m app.main',
      ],
      verifyCommand: 'curl -s http://localhost:8000/health',
    },
  },
  {
    slug: 'helox',
    name: 'Helox',
    tagline: 'Model fine-tuning and model versioning framework.',
    repo: 'Team-Deepiri/deepiri-platform',
    installMode: 'terminal',
    tags: ['CLI', 'Platform', 'AI/ML'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Python 3.10+', 'Poetry', 'Docker (for platform stack)'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-platform.git',
        'cd deepiri-platform',
        'git submodule update --init diri-helox',
        'cd diri-helox',
        'poetry install',
      ],
      verifyCommand: 'poetry run python -c "import helox; print(\'ok\')"',
    },
  },
  {
    slug: 'agent-toolbox',
    name: 'Agent Toolbox',
    tagline: 'Toolkit for building, testing, and deploying Deepiri AI agents.',
    repo: 'Team-Deepiri/diri-agent-toolbox',
    installMode: 'terminal',
    tags: ['CLI', 'Tools'],
    terminal: {
      ...curlInstall('Team-Deepiri/diri-agent-toolbox'),
      prerequisites: ['Git', 'Python 3.11+', 'Bash'],
      verifyCommand: 'python3 -c "import diri_agent_toolbox; print(\'ok\')"',
    },
  },
  {
    slug: 'training-orchestrator',
    name: 'Training Orchestrator',
    tagline: 'Orchestrate distributed ML training jobs across clusters and GPUs.',
    repo: 'Team-Deepiri/deepiri-training-orchestrator',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML', 'Infrastructure'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-training-orchestrator'),
      prerequisites: ['Git', 'Python 3.10+ (<3.14)', 'Poetry (optional)', 'Bash'],
      verifyCommand: 'python3 -c "import deepiri_training_orchestrator; print(\'ok\')"',
    },
  },
  {
    slug: 'dataset-processor',
    name: 'Dataset Processor',
    tagline: 'Preprocess, transform, and version datasets for ML pipelines.',
    repo: 'Team-Deepiri/deepiri-dataset-processor',
    installMode: 'terminal',
    tags: ['CLI', 'Data', 'AI/ML'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-dataset-processor'),
      prerequisites: ['Git', 'Python 3.11+', 'Bash'],
      verifyCommand: 'python3 -c "import deepiri_dataset_processor; print(\'ok\')"',
    },
  },
  {
    slug: 'emotion',
    name: 'Deepiri Emotion',
    tagline: 'AI-powered development environment with context-aware chat and Cyrex integrations.',
    repo: 'Team-Deepiri/deepiri-emotion',
    installMode: 'both',
    tags: ['CLI', 'Desktop', 'HCI'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Node.js 18+', 'npm', 'Git', 'Interactive terminal (TTY)'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-emotion.git',
        'cd deepiri-emotion',
        'npm install',
        'npm run cli',
        '# Optional: open CLI with a project workspace',
        'npm run cli -- /path/to/your/project',
      ],
      verifyCommand: 'node cli/index.js --version',
    },
    desktop: {
      productName: 'Deepiri Emotion IDE',
      releaseRepo: 'Team-Deepiri/deepiri-emotion',
      assets: {
        mac: 'Deepiri-Emotion-latest-arm64.dmg',
        linux: 'Deepiri-Emotion-latest.AppImage',
        windows: 'Deepiri-Emotion-latest-setup.exe',
      },
    },
  },
  {
    slug: 'memorymesh',
    name: 'MemoryMesh',
    tagline: 'Distributed memory layer for long-context AI agents and RAG systems.',
    repo: 'Team-Deepiri/deepiri-memorymesh',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML', 'Infrastructure'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-memorymesh'),
      prerequisites: ['Git', 'Python 3.10+', 'Bash', '~/.local/bin on PATH'],
      verifyCommand: 'memorymesh --help',
    },
  },
  {
    slug: 'zepgpu',
    name: 'ZepGPU',
    tagline: 'GPU detection, scheduling, and acceleration utilities for Deepiri workloads.',
    repo: 'Team-Deepiri/deepiri-zepgpu',
    installMode: 'terminal',
    tags: ['CLI', 'Infrastructure'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Docker & Docker Compose v2', 'NVIDIA Container Toolkit (optional, for GPU tasks)'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-zepgpu.git',
        'cd deepiri-zepgpu',
        'docker compose -f docker/docker-compose.yml up -d --build',
        'docker compose -f docker/docker-compose.yml ps',
        '# Optional local Python dev (requires PostgreSQL + Redis):',
        '# poetry install && poetry run uvicorn deepiri_zepgpu.api.server.main:app --reload',
      ],
      verifyCommand: 'curl -s http://localhost:8000/api/v1/health',
    },
  },
  {
    slug: 'renderflow',
    name: 'Renderflow Studio',
    tagline: 'Creative rendering studio for real-time visual pipelines and media workflows.',
    repo: 'Team-Deepiri/deepiri-renderflow-studio',
    installMode: 'both',
    tags: ['CLI', 'Desktop', 'Media'],
    terminal: {
      type: 'commands',
      prerequisites: [
        'Git',
        'Node.js 18+',
        'Rust toolchain',
        'Poetry',
        'Clone deepiri-gpu-utils as sibling of this repo (for orchestrator deps)',
      ],
      commandsByOs: {
        linux: [
          'git clone https://github.com/Team-Deepiri/deepiri-renderflow-studio.git',
          'cd deepiri-renderflow-studio',
          'cargo test --manifest-path core/timeline-engine-rs/Cargo.toml',
          'cd services/orchestrator && poetry install && ./scripts/run_orchestrator.sh',
          '# Tauri desktop UI — install WebKitGTK dev packages first:',
          'sudo apt install -y libwebkit2gtk-4.1-dev build-essential',
          'cd ../../apps/desktop-tauri/ui && npm install && npm run build',
          'cd ../src-tauri && cargo build',
        ],
        mac: [
          'git clone https://github.com/Team-Deepiri/deepiri-renderflow-studio.git',
          'cd deepiri-renderflow-studio',
          'cargo test --manifest-path core/timeline-engine-rs/Cargo.toml',
          'cd services/orchestrator && poetry install && ./scripts/run_orchestrator.sh',
          'cd ../../apps/desktop-tauri/ui && npm install && npm run build',
          'cd ../src-tauri && cargo build',
        ],
      },
      verifyCommand: 'curl -s http://127.0.0.1:8080/health',
    },
    desktop: {
      productName: 'Renderflow Studio',
      releaseRepo: 'Team-Deepiri/deepiri-renderflow-studio',
      assets: {
        mac: 'Renderflow-Studio-latest.dmg',
        linux: 'Renderflow-Studio-latest.AppImage',
        windows: 'Renderflow-Studio-latest-setup.exe',
      },
    },
  },
  {
    slug: 'fuselk',
    name: 'Fuselk',
    tagline: 'JAX-accelerated tokamak simulator with hierarchical RL control.',
    repo: 'Team-Deepiri/deepiri-fuselk',
    installMode: 'desktop',
    tags: ['Desktop', 'Platform'],
    desktop: {
      productName: 'Fuselk',
      releaseRepo: 'Team-Deepiri/deepiri-fuselk',
      comingSoon: true,
      assets: {
        mac: 'Fuselk-latest.dmg',
        linux: 'Fuselk-latest.AppImage',
        windows: 'Fuselk-latest-setup.exe',
      },
    },
  },
  {
    slug: 'egottol',
    name: 'Egottol',
    tagline: 'Analog SPICE and VHDL simulation lab with GPU-accelerated analysis.',
    repo: 'Team-Deepiri/deepiri-egottol',
    installMode: 'both',
    tags: ['CLI', 'Desktop', 'HCI'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Python 3.12+', 'Poetry 2.0+', 'CMake 3.20+', 'C++17 compiler', 'Qt6'],
      commandsByOs: {
        linux: [
          'git clone https://github.com/Team-Deepiri/deepiri-egottol.git',
          'cd deepiri-egottol',
          'sudo apt install -y qt6-base-dev cmake build-essential',
          'poetry install',
          'cmake -B build -DCMAKE_BUILD_TYPE=Release',
          'cmake --build build --parallel',
          'poetry run python -m egottol.ui.main',
          '# Debian/Ubuntu one-shot alternative: ./setup.sh',
        ],
        mac: [
          'git clone https://github.com/Team-Deepiri/deepiri-egottol.git',
          'cd deepiri-egottol',
          'brew install qt@6 cmake poetry',
          'poetry install',
          'CMAKE_PREFIX_PATH="$(brew --prefix qt@6)" cmake -B build -DCMAKE_BUILD_TYPE=Release',
          'cmake --build build --parallel',
          'poetry run python -m egottol.ui.main',
        ],
      },
      verifyCommand: 'poetry run python -c "import egottol; print(\'ok\')"',
    },
    desktop: {
      productName: 'Egottol',
      releaseRepo: 'Team-Deepiri/deepiri-egottol',
      comingSoon: true,
      assets: {
        mac: 'Egottol-latest.dmg',
        linux: 'Egottol-latest.AppImage',
        windows: 'Egottol-latest-setup.exe',
      },
    },
  },
  {
    slug: 'gpu-utils',
    name: 'GPU Utils',
    tagline: 'CLI utilities for GPU health checks, profiling, and driver diagnostics.',
    repo: 'Team-Deepiri/deepiri-gpu-utils',
    installMode: 'terminal',
    tags: ['CLI', 'Infrastructure'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-gpu-utils'),
      prerequisites: ['Git', 'Python 3.11+', 'Bash', '~/.local/bin on PATH'],
      verifyCommand: 'deepiri-gpu detect --json',
    },
  },
  {
    slug: 'calliope',
    name: 'Calliope',
    tagline: 'Local-first AI music studio stack with FastAPI backend, Vite React UI, PostgreSQL, and Ollama.',
    repo: 'Team-Deepiri/deepiri-calliope',
    installMode: 'desktop',
    tags: ['Desktop', 'AI/ML', 'HCI'],
    desktop: {
      productName: 'Calliope',
      releaseRepo: 'Team-Deepiri/deepiri-calliope',
      comingSoon: true,
      prerequisites: [
        'Docker Desktop (or Docker Engine on Linux)',
        'Ollama with `ollama pull mistral`',
        'Optional: cloud API key (OpenAI, Anthropic, OpenRouter, or Gemini)',
        '~2 GB disk for images and models',
      ],
      assets: {
        mac: 'Calliope-latest.dmg',
        linux: 'Calliope-latest.AppImage',
        windows: 'Calliope-latest-setup.exe',
      },
    },
  },
  {
    slug: 'polylogue',
    name: 'Polylogue',
    tagline: 'Filesystem-first shared LLM Streaming Journal Network (SJN).',
    repo: 'Team-Deepiri/deepiri-polylogue',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-polylogue'),
      prerequisites: ['Git', 'Python 3.10+', 'Bash', '~/.local/bin on PATH'],
      verifyCommand: 'deepiri-polylogue --version',
    },
  },
  {
    slug: 'prismpipe',
    name: 'Prismpipe',
    tagline: 'Capability-routed, self-improving API computation pipelines.',
    repo: 'Team-Deepiri/deepiri-prismpipe',
    installMode: 'terminal',
    tags: ['CLI', 'Platform', 'Infrastructure'],
    researchLink: true,
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-prismpipe'),
      prerequisites: ['Git', 'Python 3.11+', 'Poetry (optional)', 'Bash'],
      verifyCommand: 'python3 -c "import prismpipe; print(\'ok\')"',
    },
  },
  {
    slug: 'mudspeed',
    name: 'Mudspeed',
    tagline: 'Hybrid GPU emulator with Neural ODE acceleration, achieving 10-1000x speedup over cycle-accurate simulators.',
    repo: 'Team-Deepiri/deepiri-mudspeed',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML', 'Infrastructure'],
    terminal: {
      type: 'commands',
      prerequisites: [
        'Git',
        'Bash',
        'Python 3.11+',
        'PyTorch 2.2+',
        'NVIDIA CUDA, AMD ROCm, or Apple Silicon (optional)',
      ],
      commandsByOs: {
        linux: [
          'git clone https://github.com/Team-Deepiri/deepiri-mudspeed.git',
          'cd deepiri-mudspeed',
          '# NVIDIA CUDA (optional): pip install torch --index-url https://download.pytorch.org/whl/cu121',
          'bash .setup.sh',
          'bash .train.sh --quick',
          'bash .benchmark.sh',
        ],
        mac: [
          'git clone https://github.com/Team-Deepiri/deepiri-mudspeed.git',
          'cd deepiri-mudspeed',
          '# Apple Silicon uses MPS; CPU-only works without extra PyTorch wheels',
          'bash .setup.sh',
          'bash .train.sh --quick',
          'bash .benchmark.sh',
        ],
      },
      verifyCommand: 'bash .benchmark.sh',
    },
  },
  {
    slug: 'topolsea',
    name: 'Topolsea',
    tagline: 'SIMD-accelerated GraphANN vector database.',
    repo: 'Team-Deepiri/deepiri-topolsea',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML', 'Infrastructure'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Rust toolchain', 'Python 3.10+', 'Poetry'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-topolsea.git',
        'cd deepiri-topolsea',
        'cargo build --release',
        'poetry install',
        'poetry run pytest',
      ],
      verifyCommand: 'cargo run --release -p dv-cli -- --help',
    },
  },
  {
    slug: 'uqe',
    name: 'Universal Quantum Engine',
    tagline: 'Research-ready quantum experimentation lab for simulation, algorithm reinvention, and hybrid quantum-classical AI.',
    repo: 'Team-Deepiri/deepiri-uqe',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Python 3.10+', 'pip or Poetry', 'Docker (optional, for Jupyter lab)'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-uqe.git',
        'cd deepiri-uqe',
        'pip install -r requirements.txt',
        '# Or with Poetry:',
        '# poetry install',
        '# Or JupyterLab in Docker:',
        '# cd docker && docker compose up uqe-lab',
        '# Open http://localhost:8888',
      ],
      verifyCommand: 'pytest tests/ -v',
    },
  },
  {
    slug: 'agent-guardrails',
    name: 'Agent Guardrails',
    tagline: 'Safety and policy guardrails for autonomous AI agent behavior.',
    repo: 'Team-Deepiri/diri-agent-guardrails',
    installMode: 'terminal',
    tags: ['CLI', 'Ethics', 'AI/ML'],
    terminal: {
      ...curlInstall('Team-Deepiri/diri-agent-guardrails'),
      prerequisites: ['Git', 'Python 3.10+', 'Poetry (optional)', 'Bash'],
      verifyCommand: 'python3 -c "import diri_agent_guardrails; print(\'ok\')"',
    },
  },
  {
    slug: 'aarflingo',
    name: 'Aarflingo',
    tagline: 'Language intelligence toolkit for parsing, analysis, and linguistic pipelines.',
    repo: 'Team-Deepiri/deepiri-aarflingo',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML', 'Data'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Bash', 'Python 3.10+', 'Node.js 18+ (for Electron studio)'],
      commandsByOs: {
        linux: [
          'git clone https://github.com/Team-Deepiri/deepiri-aarflingo.git',
          'cd deepiri-aarflingo',
          '# setup.sh installs apt packages on Debian/Ubuntu',
          './setup.sh --run',
        ],
        mac: [
          'git clone https://github.com/Team-Deepiri/deepiri-aarflingo.git',
          'cd deepiri-aarflingo',
          '# Install Homebrew deps if prompted, then build + launch:',
          './setup.sh --run',
        ],
      },
      verifyCommand: 'curl -s http://127.0.0.1:8765/health',
    },
  },
  {
    slug: 'wooven',
    name: 'Wooven',
    tagline: 'Credentials manager tool.',
    repo: 'Team-Deepiri/deepiri-wooven',
    installMode: 'terminal',
    tags: ['CLI', 'Platform'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-wooven'),
      prerequisites: ['Git', 'Python 3.10+', 'Bash', '~/.local/bin on PATH'],
      verifyCommand: 'deepiri-wooven --version && deepiri-wooven service status',
    },
  },
  {
    slug: 'tombstone',
    name: 'Tombstone',
    tagline: 'Post-training eval harness — vintage-language pipeline stages with local Ollama in Docker.',
    repo: 'Team-Deepiri/deepiri-tombstone',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML', 'Infrastructure'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Bash', 'Docker', 'C build toolchain (installed by setup.sh)'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-tombstone.git',
        'cd deepiri-tombstone',
        './setup.sh',
        './deepiri-tombstone ping',
        './deepiri-tombstone ask llama3.2 "Say hello in one word"',
        '# Run fixture eval suite:',
        '# ./deepiri-tombstone eval llama3.2',
      ],
      verifyCommand: './deepiri-tombstone ping',
    },
  },
  {
    slug: 'voxier',
    name: 'Voxier',
    tagline: 'Godot-based game project by Deepiri.',
    repo: 'Team-Deepiri/deepiri-voxier',
    installMode: 'desktop',
    tags: ['Desktop', 'Media', 'HCI'],
    desktop: {
      productName: 'Voxier',
      releaseRepo: 'Team-Deepiri/deepiri-voxier',
      comingSoon: true,
      assets: {
        mac: 'Voxier-latest.dmg',
        linux: 'Voxier-latest.zip',
        windows: 'Voxier-latest.exe',
      },
    },
  },
  {
    slug: 'ollama-utils',
    name: 'Ollama Utils',
    tagline: 'Utilities for managing Ollama models, wheels, and local inference stacks.',
    repo: 'Team-Deepiri/deepiri-ollama-utils',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML', 'Tools'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-ollama-utils'),
      prerequisites: ['Git', 'Python 3.9+', 'Ollama running (for verify)', 'Bash', '~/.local/bin on PATH'],
      verifyCommand: 'deepiri-ollama-utils check',
    },
    package: {
      label: 'Python wheel',
      releaseRepo: 'Team-Deepiri/deepiri-ollama-utils',
      asset: 'deepiri_ollama_utils-0.1.0-py3-none-any.whl',
      fallbackCommands: [
        'pip install https://github.com/Team-Deepiri/deepiri-ollama-utils/releases/latest/download/deepiri_ollama_utils-0.1.0-py3-none-any.whl',
        '# Or from source:',
        'pip install git+https://github.com/Team-Deepiri/deepiri-ollama-utils.git',
      ],
    },
  },
  {
    slug: 'platform',
    name: 'Deepiri Platform',
    tagline: 'Main Deepiri monolith repository.',
    repo: 'Team-Deepiri/deepiri-platform',
    installMode: 'terminal',
    tags: ['CLI', 'Platform', 'Infrastructure'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Docker & Docker Compose v2', 'Git', '8GB+ RAM recommended'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-platform.git',
        'cd deepiri-platform',
        'git submodule update --init --recursive',
        'docker compose -f docker-compose.dev.yml up -d',
        'docker compose -f docker-compose.dev.yml ps',
        '# Frontend: http://localhost:5173  API Gateway: http://localhost:5100  Cyrex: http://localhost:8000',
      ],
      verifyCommand: 'docker compose -f docker-compose.dev.yml ps',
    },
  },
];

export const TOOL_SLUGS = toolsCatalog.map((t) => t.slug);

export function getToolBySlug(slug: string): ToolEntry | undefined {
  return toolsCatalog.find((t) => t.slug === slug);
}

export type ToolFilter = 'all' | 'cli' | 'desktop' | 'platform';

export function filterTools(filter: ToolFilter): ToolEntry[] {
  switch (filter) {
    case 'cli':
      return toolsCatalog.filter(
        (t) => t.installMode === 'terminal' || t.installMode === 'both',
      );
    case 'desktop':
      return toolsCatalog.filter(
        (t) => t.installMode === 'desktop' || t.installMode === 'both',
      );
    case 'platform':
      return toolsCatalog.filter((t) => t.tags.includes('Platform'));
    default:
      return toolsCatalog;
  }
}

export function installModeLabel(mode: InstallMode): string {
  switch (mode) {
    case 'terminal':
      return 'CLI';
    case 'desktop':
      return 'Desktop';
    case 'both':
      return 'CLI + Desktop';
  }
}
