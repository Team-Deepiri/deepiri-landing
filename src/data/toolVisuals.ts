export type ToolCategory =
  | 'ai-ml'
  | 'platform'
  | 'infrastructure'
  | 'hci'
  | 'media'
  | 'data'
  | 'ethics'
  | 'tools';

export type VizType =
  | 'agent-network'
  | 'pipeline'
  | 'cluster'
  | 'version-evolution'
  | 'graph-memory'
  | 'platform-stack'
  | 'desktop-app'
  | 'simulation'
  | 'guardrail'
  | 'utility';

export type CardSize = 'hero' | 'large' | 'standard';
export type ToolStatus = 'ready' | 'beta' | 'coming-soon';

export interface ToolVisual {
  category: ToolCategory;
  vizType: VizType;
  workflow: string[];
  size: CardSize;
  status: ToolStatus;
  relatedTools?: string[];
}

export const categoryColors: Record<
  ToolCategory,
  { accent: string; bg: string; border: string; text: string }
> = {
  'ai-ml': {
    accent: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.1)',
    border: 'rgba(99, 102, 241, 0.25)',
    text: '#4338ca',
  },
  platform: {
    accent: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.25)',
    text: '#6d28d9',
  },
  infrastructure: {
    accent: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.25)',
    text: '#1d4ed8',
  },
  hci: {
    accent: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.1)',
    border: 'rgba(236, 72, 153, 0.25)',
    text: '#be185d',
  },
  media: {
    accent: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.25)',
    text: '#b45309',
  },
  data: {
    accent: '#14b8a6',
    bg: 'rgba(20, 184, 166, 0.1)',
    border: 'rgba(20, 184, 166, 0.25)',
    text: '#0f766e',
  },
  ethics: {
    accent: '#10b981',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.25)',
    text: '#047857',
  },
  tools: {
    accent: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.1)',
    border: 'rgba(6, 182, 212, 0.25)',
    text: '#0e7490',
  },
};

const TAG_CATEGORY: Record<string, ToolCategory> = {
  'AI/ML': 'ai-ml',
  Platform: 'platform',
  Infrastructure: 'infrastructure',
  HCI: 'hci',
  Media: 'media',
  Data: 'data',
  Ethics: 'ethics',
  Tools: 'tools',
  CLI: 'tools',
  Desktop: 'hci',
};

export function getTagCategory(tag: string): ToolCategory {
  return TAG_CATEGORY[tag] ?? 'tools';
}

export const toolVisuals: Record<string, ToolVisual> = {
  platform: {
    category: 'platform',
    vizType: 'platform-stack',
    workflow: ['Clone', 'Compose', 'Services', 'Develop'],
    size: 'hero',
    status: 'ready',
    relatedTools: ['cyrex', 'helox', 'agent-toolbox'],
  },
  cyrex: {
    category: 'ai-ml',
    vizType: 'agent-network',
    workflow: ['Input', 'Agent', 'Tools', 'Output'],
    size: 'large',
    status: 'ready',
    relatedTools: ['platform', 'agent-toolbox', 'emotion'],
  },
  emotion: {
    category: 'hci',
    vizType: 'agent-network',
    workflow: ['Context', 'Chat', 'Integrate', 'Build'],
    size: 'large',
    status: 'ready',
    relatedTools: ['cyrex', 'agent-toolbox'],
  },
  helox: {
    category: 'ai-ml',
    vizType: 'version-evolution',
    workflow: ['Train', 'Version', 'Compare', 'Deploy'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['training-orchestrator', 'dataset-processor'],
  },
  'agent-toolbox': {
    category: 'tools',
    vizType: 'agent-network',
    workflow: ['Build', 'Test', 'Deploy', 'Monitor'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['cyrex', 'agent-guardrails'],
  },
  'training-orchestrator': {
    category: 'ai-ml',
    vizType: 'cluster',
    workflow: ['Submit', 'Schedule', 'Distribute', 'Complete'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['helox', 'zepgpu', 'dataset-processor'],
  },
  'dataset-processor': {
    category: 'data',
    vizType: 'pipeline',
    workflow: ['Ingest', 'Transform', 'Validate', 'Version'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['helox', 'training-orchestrator'],
  },
  memorymesh: {
    category: 'ai-ml',
    vizType: 'graph-memory',
    workflow: ['Store', 'Index', 'Retrieve', 'Context'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['cyrex', 'topolsea'],
  },
  zepgpu: {
    category: 'infrastructure',
    vizType: 'cluster',
    workflow: ['Detect', 'Schedule', 'Allocate', 'Accelerate'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['gpu-utils', 'training-orchestrator'],
  },
  renderflow: {
    category: 'media',
    vizType: 'desktop-app',
    workflow: ['Timeline', 'Render', 'Preview', 'Export'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['gpu-utils'],
  },
  fuselk: {
    category: 'platform',
    vizType: 'simulation',
    workflow: ['Model', 'Simulate', 'Control', 'Analyze'],
    size: 'standard',
    status: 'coming-soon',
  },
  egottol: {
    category: 'hci',
    vizType: 'simulation',
    workflow: ['Design', 'Simulate', 'Analyze', 'Iterate'],
    size: 'standard',
    status: 'coming-soon',
  },
  'gpu-utils': {
    category: 'infrastructure',
    vizType: 'cluster',
    workflow: ['Detect', 'Profile', 'Diagnose', 'Report'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['zepgpu', 'mudspeed'],
  },
  calliope: {
    category: 'hci',
    vizType: 'desktop-app',
    workflow: ['Compose', 'Generate', 'Mix', 'Export'],
    size: 'standard',
    status: 'coming-soon',
  },
  polylogue: {
    category: 'ai-ml',
    vizType: 'graph-memory',
    workflow: ['Journal', 'Stream', 'Share', 'Sync'],
    size: 'standard',
    status: 'ready',
  },
  prismpipe: {
    category: 'platform',
    vizType: 'pipeline',
    workflow: ['Route', 'Execute', 'Improve', 'Deliver'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['cyrex', 'platform'],
  },
  mudspeed: {
    category: 'infrastructure',
    vizType: 'cluster',
    workflow: ['Emulate', 'Accelerate', 'Train', 'Benchmark'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['gpu-utils', 'zepgpu'],
  },
  topolsea: {
    category: 'ai-ml',
    vizType: 'graph-memory',
    workflow: ['Index', 'Graph', 'Query', 'Retrieve'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['memorymesh'],
  },
  uqe: {
    category: 'ai-ml',
    vizType: 'simulation',
    workflow: ['Design', 'Simulate', 'Hybridize', 'Analyze'],
    size: 'standard',
    status: 'ready',
  },
  'agent-guardrails': {
    category: 'ethics',
    vizType: 'guardrail',
    workflow: ['Policy', 'Evaluate', 'Block', 'Audit'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['agent-toolbox', 'cyrex'],
  },
  aarflingo: {
    category: 'data',
    vizType: 'pipeline',
    workflow: ['Parse', 'Analyze', 'Transform', 'Output'],
    size: 'standard',
    status: 'ready',
  },
  wooven: {
    category: 'platform',
    vizType: 'guardrail',
    workflow: ['Store', 'Encrypt', 'Access', 'Rotate'],
    size: 'standard',
    status: 'ready',
  },
  tombstone: {
    category: 'ai-ml',
    vizType: 'pipeline',
    workflow: ['Stage', 'Eval', 'Score', 'Report'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['ollama-utils'],
  },
  voxier: {
    category: 'media',
    vizType: 'desktop-app',
    workflow: ['Design', 'Build', 'Play', 'Ship'],
    size: 'standard',
    status: 'coming-soon',
  },
  'ollama-utils': {
    category: 'tools',
    vizType: 'utility',
    workflow: ['Pull', 'Manage', 'Serve', 'Verify'],
    size: 'standard',
    status: 'ready',
    relatedTools: ['tombstone', 'calliope'],
  },
};

const DEFAULT_VISUAL: ToolVisual = {
  category: 'tools',
  vizType: 'utility',
  workflow: ['Install', 'Configure', 'Run', 'Verify'],
  size: 'standard',
  status: 'ready',
};

export function getToolVisual(slug: string): ToolVisual {
  return toolVisuals[slug] ?? DEFAULT_VISUAL;
}

export function statusLabel(status: ToolStatus): string {
  switch (status) {
    case 'coming-soon':
      return 'Coming Soon';
    case 'beta':
      return 'Beta';
    default:
      return 'Ready';
  }
}
