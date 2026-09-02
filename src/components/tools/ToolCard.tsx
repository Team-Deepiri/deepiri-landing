import { useCallback, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { ToolEntry } from '../../data/toolsCatalog';
import { installModeLabel } from '../../data/toolsCatalog';
import {
  categoryColors,
  getTagCategory,
  getToolVisual,
  statusLabel,
} from '../../data/toolVisuals';
import ToolVisualization from './ToolVisualization';
import './tools.css';

interface ToolCardProps {
  tool: ToolEntry;
  index?: number;
}

function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const visual = getToolVisual(tool.slug);
  const colors = categoryColors[visual.category];
  const displayTags = tool.tags.slice(0, 3);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);

    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    setIsHovered(false);
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/tools/${tool.slug}`}
      className={`tool-card tool-card--${visual.size} tool-card--${visual.category}`}
      style={
        {
          '--card-accent': colors.accent,
          '--card-bg': colors.bg,
          '--card-border': colors.border,
          '--card-index': index,
        } as CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tool-card-spotlight" aria-hidden="true" />
      <div className="tool-card-accent" aria-hidden="true" />

      <ToolVisualization
        slug={tool.slug}
        intensity={isHovered ? 'hover' : 'rest'}
        style={{ animationDelay: `${(index % 8) * 0.15}s` }}
      />

      <div className="tool-card-header">
        <h3 className="tool-card-name">{tool.name}</h3>
        <div className="tool-card-badges-top">
          {visual.status !== 'ready' && (
            <span className={`tool-badge tool-badge-status tool-badge-status--${visual.status}`}>
              {statusLabel(visual.status)}
            </span>
          )}
          <span className="tool-badge tool-badge-mode">{installModeLabel(tool.installMode)}</span>
        </div>
      </div>

      <p className="tool-card-tagline">{tool.tagline}</p>

      <div className="tool-badges">
        {displayTags.map((tag) => {
          const tagCat = getTagCategory(tag);
          const tagColors = categoryColors[tagCat];
          return (
            <span
              key={tag}
              className="tool-badge tool-badge-tag"
              style={
                {
                  '--tag-bg': tagColors.bg,
                  '--tag-border': tagColors.border,
                  '--tag-text': tagColors.text,
                } as CSSProperties
              }
            >
              {tag}
            </span>
          );
        })}
      </div>

      <div className="tool-card-footer">
        <span className="tool-card-workflow">
          {visual.workflow.slice(0, 3).join(' → ')}
        </span>
        <span className="tool-card-link">Install →</span>
      </div>
    </Link>
  );
}

export default ToolCard;
