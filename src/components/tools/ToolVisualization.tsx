import { categoryColors, getToolVisual } from '../../data/toolVisuals';
import { VizScene, type VizIntensity } from './visualizations/VizScenes';
import type { CSSProperties } from 'react';
import './ToolVisualization.css';

interface ToolVisualizationProps {
  slug: string;
  intensity?: VizIntensity;
  size?: 'card' | 'detail';
  className?: string;
  style?: CSSProperties;
}

function ToolVisualization({
  slug,
  intensity = 'rest',
  size = 'card',
  className = '',
  style,
}: ToolVisualizationProps) {
  const visual = getToolVisual(slug);
  const colors = categoryColors[visual.category];
  const isComingSoon = visual.status === 'coming-soon';

  return (
    <div
      className={`tool-viz tool-viz--${size} tool-viz--${visual.category}${isComingSoon ? ' tool-viz--muted' : ''} ${className}`}
      style={
        {
          '--viz-accent': colors.accent,
          '--viz-bg': colors.bg,
          '--viz-border': colors.border,
          ...style,
        } as CSSProperties
      }
    >
      <div className="tool-viz__glow" aria-hidden="true" />
      <VizScene
        vizType={visual.vizType}
        accent={colors.accent}
        intensity={intensity}
        className="tool-viz__svg"
      />
    </div>
  );
}

export default ToolVisualization;
