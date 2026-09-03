export interface ResearchRepo {
  iconKey: string;
  name: string;
  githubUrl: string;
  description: string;
  toolSlug?: string;
}

export const researchRepos: ResearchRepo[] = [
  {
    iconKey: 'platform',
    name: 'Deepiri Control Plane',
    githubUrl: 'https://github.com/Team-Deepiri/deepiri-control-plane',
    description:
      'Deepiri Control Plane is the local lab builder stack — Cyrex, Synapse, speech, Kafka, Milvus, MLflow, Ollama, and the full gateway. It has its own decoupled auth, external bridge, and frontend. For the cloud VPS portal, see deepiri-platform.',
    toolSlug: 'control-plane',
  },
  {
    iconKey: 'cyrex',
    name: 'Deepiri Cyrex',
    githubUrl: 'https://github.com/Team-Deepiri/diri-cyrex',
    description:
      'Cyrex is our production-ready AI platform for multi-agent orchestration, enterprise RAG, and high-impact automation. Its flagship system, Cyrex Guard, helps organizations detect vendor fraud with invoice intelligence, pricing benchmarks, risk scoring, and a full-stack workflow built for real operational teams.',
    toolSlug: 'cyrex',
  },
  {
    iconKey: 'intelligence',
    name: 'Deepiri Intelligence Service',
    githubUrl: 'https://github.com/Team-Deepiri/deepiri-language-intelligence-service',
    description:
      'Intelligence Service powers our document AI engine for deep language understanding at scale. From contract analysis and structure extraction to version-aware comparison, this repository turns complex documents into clear, actionable insight.',
  },
  {
    iconKey: 'emotion',
    name: 'Deepiri Emotion IDE',
    githubUrl: 'https://github.com/Team-Deepiri/deepiri-emotion',
    description:
      'Emotion IDE is our AI-powered development environment designed to make engineers faster, sharper, and more creative. With context-aware chat, apply-to-file workflows, and optional Cyrex and Helox integrations, it bridges daily coding with advanced RAG, pipeline execution, and API automation.',
    toolSlug: 'emotion',
  },
  {
    iconKey: 'uqe',
    name: 'Deepiri Universal Quantum Engine',
    githubUrl: 'https://github.com/Team-Deepiri/deepiri-uqe',
    description:
      'Universal Quantum Engine (UQE) is our quantum experimentation lab built for serious AI-forward research. It combines a pure-NumPy statevector simulator, a quantum bridge for PyTorch workflows, and interactive 3D visualizations to rapidly prototype next-gen computational ideas.',
    toolSlug: 'uqe',
  },
  {
    iconKey: 'prismpipe',
    name: 'Deepiri Prismpipe',
    githubUrl: 'https://github.com/Team-Deepiri/deepiri-prismpipe',
    description:
      'Deepiri Prismpipe reimagines APIs as capability-routed, self-improving computation pipelines. With persistent "Organic Pipes," result deduplication, intent-driven planning, and speculative execution, it delivers faster systems that get smarter with every run.',
    toolSlug: 'prismpipe',
  },
  {
    iconKey: 'persola',
    name: 'Deepiri Persola',
    githubUrl: 'https://github.com/Team-Deepiri/diri-persola',
    description:
      'Persola is our personality framework for building AI agents that are not just capable, but memorable. It tunes behavior across creativity, personality, reasoning, and reliability, supports multi-model backends, and integrates directly with Cyrex to deploy agents that feel intentional and human-centered.',
  },
  {
    iconKey: 'helox',
    name: 'Deepiri Helox',
    githubUrl: 'https://github.com/Team-Deepiri/diri-helox',
    description:
      'Helox is our machine learning engine for data generation, model training, and robust evaluation. It gives teams a practical path from synthetic data to production-ready models with repeatable pipelines and rigorous testing.',
    toolSlug: 'helox',
  },
];
