import type { ComponentType } from 'react';
import type { VizType } from '../../../data/toolVisuals';

export type VizIntensity = 'rest' | 'hover' | 'expanded';

interface SceneProps {
  accent: string;
  intensity: VizIntensity;
  className?: string;
}

function pulseClass(intensity: VizIntensity): string {
  return intensity === 'hover' ? 'viz-pulse-fast' : intensity === 'expanded' ? 'viz-pulse-active' : 'viz-pulse-slow';
}

export function AgentNetworkScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1.2s' : intensity === 'expanded' ? '0.8s' : '4s';
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <circle cx="100" cy="50" r="10" fill={accent} opacity="0.9">
        <animate attributeName="r" values="9;11;9" dur={speed} repeatCount="indefinite" />
      </circle>
      {[
        [40, 30], [160, 30], [40, 70], [160, 70],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <line x1="100" y1="50" x2={cx} y2={cy} stroke={accent} strokeWidth="1.5" opacity="0.35" strokeDasharray="4 3">
            <animate attributeName="stroke-dashoffset" values="0;-14" dur={speed} repeatCount="indefinite" />
          </line>
          <circle cx={cx} cy={cy} r="6" stroke={accent} strokeWidth="1.5" fill="white" opacity="0.95" />
        </g>
      ))}
      <circle r="2.5" fill={accent} opacity="0.8">
        <animateMotion dur={speed} repeatCount="indefinite" path="M40,30 L100,50 L160,30" />
      </circle>
    </svg>
  );
}

export function PipelineScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1.5s' : intensity === 'expanded' ? '1s' : '5s';
  const stages = [30, 75, 120, 165];
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      {stages.map((x, i) => (
        <g key={i}>
          <rect x={x - 14} y="38" width="28" height="24" rx="4" stroke={accent} strokeWidth="1.5" fill="white" opacity="0.9" />
          {i < stages.length - 1 && (
            <line x1={x + 14} y1="50" x2={stages[i + 1] - 14} y2="50" stroke={accent} strokeWidth="1.5" opacity="0.4" />
          )}
        </g>
      ))}
      <circle r="4" fill={accent}>
        <animateMotion dur={speed} repeatCount="indefinite" path="M16,50 L184,50" />
      </circle>
    </svg>
  );
}

export function ClusterScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1s' : intensity === 'expanded' ? '0.7s' : '4s';
  const nodes = [
    [50, 35], [100, 35], [150, 35],
    [50, 65], [100, 65], [150, 65],
  ];
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      {nodes.map(([cx, cy], i) => (
        <rect key={i} x={cx - 12} y={cy - 10} width="24" height="20" rx="3" stroke={accent} strokeWidth="1.5" fill="white" opacity="0.85">
          <animate attributeName="opacity" values="0.7;1;0.7" dur={speed} begin={`${i * 0.15}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <circle r="3" fill={accent}>
        <animateMotion dur={speed} repeatCount="indefinite" path="M50,35 L100,35 L150,35 L150,65 L100,65 L50,65 L50,35" />
      </circle>
    </svg>
  );
}

export function VersionEvolutionScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1.5s' : intensity === 'expanded' ? '1s' : '5s';
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={40 + i * 35} y={70 - i * 12} width="24" height={20 + i * 8} rx="3" stroke={accent} strokeWidth="1.5" fill="white" opacity={0.6 + i * 0.1}>
            <animate attributeName="y" values={`${72 - i * 12};${68 - i * 12};${72 - i * 12}`} dur={speed} begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </rect>
          <text x={52 + i * 35} y={82 - i * 12} fontSize="7" fill={accent} fontFamily="monospace">v{i + 1}</text>
        </g>
      ))}
      <path d="M55 75 L90 60 L125 48 L160 32" stroke={accent} strokeWidth="1.5" opacity="0.5" strokeDasharray="3 2">
        <animate attributeName="stroke-dashoffset" values="0;-10" dur={speed} repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export function GraphMemoryScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1.2s' : intensity === 'expanded' ? '0.8s' : '4s';
  const nodes = [
    [100, 50], [60, 30], [140, 30], [50, 70], [150, 70],
  ];
  const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 4]];
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.3"
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 0 ? 8 : 5} fill={i === 0 ? accent : 'white'} stroke={accent} strokeWidth="1.5" opacity="0.9">
          {i === 0 && <animate attributeName="r" values="7;9;7" dur={speed} repeatCount="indefinite" />}
        </circle>
      ))}
    </svg>
  );
}

export function PlatformStackScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1.5s' : intensity === 'expanded' ? '1s' : '5s';
  const layers = [
    { y: 62, w: 120, label: 'API' },
    { y: 48, w: 100, label: 'Services' },
    { y: 34, w: 80, label: 'Core' },
  ];
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      {layers.map((layer, i) => (
        <g key={i}>
          <rect
            x={100 - layer.w / 2}
            y={layer.y}
            width={layer.w}
            height="14"
            rx="3"
            stroke={accent}
            strokeWidth="1.5"
            fill="white"
            opacity="0.85"
          >
            <animate attributeName="opacity" values="0.7;1;0.7" dur={speed} begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      <circle cx="100" cy="22" r="6" fill={accent} opacity="0.9">
        <animate attributeName="opacity" values="0.7;1;0.7" dur={speed} repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function DesktopAppScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1.2s' : intensity === 'expanded' ? '0.8s' : '4s';
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <rect x="45" y="20" width="110" height="65" rx="6" stroke={accent} strokeWidth="1.5" fill="white" opacity="0.9" />
      <rect x="45" y="20" width="110" height="14" rx="6" fill={accent} opacity="0.15" />
      <circle cx="55" cy="27" r="2.5" fill="#ef4444" opacity="0.7" />
      <circle cx="63" cy="27" r="2.5" fill="#eab308" opacity="0.7" />
      <circle cx="71" cy="27" r="2.5" fill="#22c55e" opacity="0.7" />
      <rect x="55" y="42" width="90" height="6" rx="2" fill={accent} opacity="0.2">
        <animate attributeName="width" values="40;90;40" dur={speed} repeatCount="indefinite" />
      </rect>
      <rect x="55" y="54" width="60" height="6" rx="2" fill={accent} opacity="0.15" />
      <rect x="55" y="66" width="75" height="6" rx="2" fill={accent} opacity="0.1" />
    </svg>
  );
}

export function SimulationScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '0.8s' : intensity === 'expanded' ? '0.5s' : '3s';
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <path d="M30 50 Q50 20, 70 50 T110 50 T150 50 T190 50" stroke={accent} strokeWidth="2" fill="none" opacity="0.7">
        <animate attributeName="d" values="M30 50 Q50 20, 70 50 T110 50 T150 50 T190 50;M30 50 Q50 80, 70 50 T110 50 T150 50 T190 50;M30 50 Q50 20, 70 50 T110 50 T150 50 T190 50" dur={speed} repeatCount="indefinite" />
      </path>
      <ellipse cx="100" cy="50" rx="35" ry="12" stroke={accent} strokeWidth="1.5" opacity="0.3" transform="rotate(30 100 50)" />
      <ellipse cx="100" cy="50" rx="35" ry="12" stroke={accent} strokeWidth="1.5" opacity="0.3" transform="rotate(-30 100 50)" />
      <circle cx="100" cy="50" r="4" fill={accent}>
        <animate attributeName="r" values="3;5;3" dur={speed} repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function GuardrailScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1s' : intensity === 'expanded' ? '0.7s' : '4s';
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <path d="M100 18 L130 30 V55 C130 70 100 82 100 82 C100 82 70 70 70 55 V30 Z" stroke={accent} strokeWidth="1.5" fill="white" opacity="0.9" />
      <path d="M88 52 L96 60 L114 42" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <line x1="30" y1="50" x2="68" y2="50" stroke={accent} strokeWidth="1.5" opacity="0.4" strokeDasharray="3 2">
        <animate attributeName="stroke-dashoffset" values="0;-10" dur={speed} repeatCount="indefinite" />
      </line>
      <line x1="132" y1="50" x2="170" y2="50" stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <circle r="2.5" fill={accent}>
        <animateMotion dur={speed} repeatCount="indefinite" path="M30,50 L68,50" />
      </circle>
    </svg>
  );
}

export function UtilityScene({ accent, intensity, className }: SceneProps) {
  const speed = intensity === 'hover' ? '1.5s' : intensity === 'expanded' ? '1s' : '5s';
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <circle cx="100" cy="50" r="22" stroke={accent} strokeWidth="1.5" fill="white" opacity="0.9" />
      <path d="M100 35 V50 L112 58" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" from="0 100 50" to="360 100 50" dur={speed} repeatCount="indefinite" />
      </path>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <circle
          key={i}
          cx={100 + 32 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 32 * Math.sin((angle * Math.PI) / 180)}
          r="3"
          fill={accent}
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

const SCENE_MAP: Record<VizType, ComponentType<SceneProps>> = {
  'agent-network': AgentNetworkScene,
  pipeline: PipelineScene,
  cluster: ClusterScene,
  'version-evolution': VersionEvolutionScene,
  'graph-memory': GraphMemoryScene,
  'platform-stack': PlatformStackScene,
  'desktop-app': DesktopAppScene,
  simulation: SimulationScene,
  guardrail: GuardrailScene,
  utility: UtilityScene,
};

export function VizScene({ vizType, accent, intensity, className }: SceneProps & { vizType: VizType }) {
  const Component = SCENE_MAP[vizType];
  return <Component accent={accent} intensity={intensity} className={`${className ?? ''} ${pulseClass(intensity)}`} />;
}
