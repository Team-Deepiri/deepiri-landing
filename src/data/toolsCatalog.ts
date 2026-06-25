export type InstallMode = 'terminal' | 'desktop' | 'both';

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
    tagline: 'Production-ready AI platform for multi-agent orchestration and enterprise RAG.',
    repo: 'Team-Deepiri/diri-cyrex',
    installMode: 'terminal',
    tags: ['CLI', 'Platform', 'AI/ML'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Docker & Docker Compose', 'Git', 'Poetry (optional, for local dev)'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-platform.git',
        'cd deepiri-platform',
        'docker compose up -d',
        '# Or for local development:',
        'cd diri-cyrex && poetry install',
      ],
      verifyCommand: 'docker compose ps',
    },
  },
  {
    slug: 'helox',
    name: 'Helox',
    tagline: 'Machine learning engine for data generation, training, and evaluation pipelines.',
    repo: 'Team-Deepiri/deepiri-platform',
    installMode: 'terminal',
    tags: ['CLI', 'Platform', 'AI/ML'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Python 3.10+', 'Poetry'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-platform.git',
        'cd deepiri-platform',
        'git submodule update --init diri-helox',
        'cd diri-helox',
        'poetry install',
      ],
      verifyCommand: 'poetry run python -c "import helox"',
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
      prerequisites: ['Python 3.10+', 'pip or Poetry'],
      verifyCommand: 'deepiri-agent-toolbox --help',
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
      prerequisites: ['Python 3.10+', 'Docker (optional)'],
      verifyCommand: 'deepiri-training-orchestrator --version',
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
      prerequisites: ['Python 3.10+'],
      verifyCommand: 'deepiri-dataset-processor --help',
    },
  },
  {
    slug: 'emotion',
    name: 'Deepiri Emotion',
    tagline: 'AI-powered development environment with context-aware chat and Cyrex integrations.',
    repo: 'Team-Deepiri/deepiri-emotion-desktop',
    installMode: 'both',
    tags: ['CLI', 'Desktop', 'HCI'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Node.js 18+', 'npm', 'Git'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-emotion-desktop.git',
        'cd deepiri-emotion-desktop',
        'npm install',
        'npm run cli',
      ],
      verifyCommand: 'npm run cli -- --version',
    },
    desktop: {
      productName: 'Deepiri Emotion IDE',
      releaseRepo: 'Team-Deepiri/deepiri-emotion-desktop',
      comingSoon: true,
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
      prerequisites: ['Python 3.10+', 'Redis or compatible store'],
      verifyCommand: 'deepiri-memorymesh status',
    },
  },
  {
    slug: 'zepgpu',
    name: 'ZepGPU',
    tagline: 'GPU detection, scheduling, and acceleration utilities for Deepiri workloads.',
    repo: 'Team-Deepiri/deepiri-zepgpu',
    installMode: 'both',
    tags: ['CLI', 'Desktop', 'Infrastructure'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Python 3.10+', 'Poetry', 'Docker', 'NVIDIA drivers'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-zepgpu.git',
        'cd deepiri-zepgpu',
        'poetry install',
        'cd docker && docker compose up -d',
      ],
      verifyCommand: 'poetry run deepiri-gpu detect --json',
    },
    desktop: {
      productName: 'ZepGPU',
      releaseRepo: 'Team-Deepiri/deepiri-zepgpu',
      comingSoon: true,
      assets: {
        mac: 'ZepGPU-latest.dmg',
        linux: 'ZepGPU-latest.AppImage',
        windows: 'ZepGPU-latest-setup.exe',
      },
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
      prerequisites: ['Git', 'Node.js 18+', 'Rust toolchain (for Tauri)'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-renderflow-studio.git',
        'cd deepiri-renderflow-studio',
        'npm install',
        'cd apps/desktop-tauri && npm run tauri dev',
      ],
    },
    desktop: {
      productName: 'Renderflow Studio',
      releaseRepo: 'Team-Deepiri/deepiri-renderflow-studio',
      comingSoon: true,
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
    tagline: 'Desktop fusion toolkit for linking local apps with Deepiri cloud services.',
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
    tagline: 'Hybrid C++/Python UI framework for high-performance Deepiri desktop tools.',
    repo: 'Team-Deepiri/deepiri-egottol',
    installMode: 'both',
    tags: ['CLI', 'Desktop', 'HCI'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Python 3.10+', 'Poetry', 'CMake', 'C++ compiler'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-egottol.git',
        'cd deepiri-egottol',
        './setup.sh',
        '# Or manual setup:',
        'poetry install',
        'cmake -B build && cmake --build build',
        'poetry run python -m egottol.ui.main',
      ],
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
      prerequisites: ['Python 3.10+', 'NVIDIA or AMD drivers'],
      verifyCommand: 'deepiri-gpu doctor',
    },
  },
  {
    slug: 'calliope',
    name: 'Calliope',
    tagline: 'Creative writing and narrative AI assistant with local and cloud backends.',
    repo: 'Team-Deepiri/deepiri-calliope',
    installMode: 'desktop',
    tags: ['Desktop', 'AI/ML', 'HCI'],
    desktop: {
      productName: 'Calliope',
      releaseRepo: 'Team-Deepiri/deepiri-calliope',
      comingSoon: true,
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
    tagline: 'Multi-voice dialogue system for conversational AI and agent personas.',
    repo: 'Team-Deepiri/deepiri-polylogue',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-polylogue', 'install.sh'),
      prerequisites: ['Python 3.10+', 'Bash'],
      verifyCommand: 'polylogue --help',
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
      prerequisites: ['Python 3.10+', 'Docker (optional)'],
      verifyCommand: 'prismpipe --version',
    },
  },
  {
    slug: 'mudspeed',
    name: 'Mudspeed',
    tagline: 'Fast experimentation framework for training and benchmarking ML models.',
    repo: 'Team-Deepiri/deepiri-mudspeed',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Bash', 'Python 3.10+'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-mudspeed.git',
        'cd deepiri-mudspeed',
        'bash .setup.sh',
        'bash .train.sh',
      ],
    },
  },
  {
    slug: 'topolsea',
    name: 'Topolsea',
    tagline: 'Topological and geometric computation engine with Rust and Python bindings.',
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
      ],
      verifyCommand: 'cargo run --release -- --version',
    },
  },
  {
    slug: 'uqe',
    name: 'Universal Quantum Engine',
    tagline: 'Quantum experimentation lab with statevector simulation and PyTorch bridge.',
    repo: 'Team-Deepiri/deepiri-uqe',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML'],
    researchLink: true,
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Python 3.10+', 'Poetry or pip'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-uqe.git',
        'cd deepiri-uqe',
        'poetry install',
        '# Or: pip install -r requirements.txt',
      ],
      verifyCommand: 'poetry run python -c "import uqe"',
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
      prerequisites: ['Python 3.10+'],
      verifyCommand: 'deepiri-guardrails --help',
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
      prerequisites: ['Git', 'Bash', 'Python 3.10+'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-aarflingo.git',
        'cd deepiri-aarflingo',
        './setup.sh --run',
      ],
    },
  },
  {
    slug: 'wooven',
    name: 'Wooven',
    tagline: 'Weaving layer for composing multi-model AI workflows and data fabrics.',
    repo: 'Team-Deepiri/deepiri-wooven',
    installMode: 'terminal',
    tags: ['CLI', 'Platform'],
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-wooven', 'install.sh'),
      prerequisites: ['Python 3.10+', 'Bash'],
      verifyCommand: 'wooven --help',
    },
  },
  {
    slug: 'tombstone',
    name: 'Tombstone',
    tagline: 'Local LLM runtime with Ollama Docker bootstrap and model management.',
    repo: 'Team-Deepiri/deepiri-tombstone',
    installMode: 'terminal',
    tags: ['CLI', 'AI/ML', 'Infrastructure'],
    terminal: {
      type: 'commands',
      prerequisites: ['Git', 'Bash', 'Docker', 'Ollama-compatible GPU (optional)'],
      commands: [
        'git clone https://github.com/Team-Deepiri/deepiri-tombstone.git',
        'cd deepiri-tombstone',
        './setup.sh',
      ],
      verifyCommand: './deepiri-tombstone ping',
    },
  },
  {
    slug: 'voxier',
    name: 'Voxier',
    tagline: 'Voice and audio creative suite built on Godot for interactive media.',
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
      prerequisites: ['Python 3.10+', 'Ollama installed locally'],
      verifyCommand: 'deepiri-ollama-utils --help',
    },
  },
  {
    slug: 'platform',
    name: 'Deepiri Platform',
    tagline: 'Open-source command center: foundational stack for every Deepiri initiative.',
    repo: 'Team-Deepiri/deepiri-platform',
    installMode: 'terminal',
    tags: ['CLI', 'Platform', 'Infrastructure'],
    researchLink: true,
    terminal: {
      ...curlInstall('Team-Deepiri/deepiri-platform'),
      prerequisites: ['Docker & Docker Compose', 'Git', 'Bash'],
      verifyCommand: 'docker compose ps',
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
