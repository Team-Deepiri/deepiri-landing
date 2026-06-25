import { Link } from 'react-router-dom';
import type { ToolEntry } from '../../data/toolsCatalog';
import { installModeLabel } from '../../data/toolsCatalog';
import './tools.css';

interface ToolCardProps {
  tool: ToolEntry;
}

function ToolCard({ tool }: ToolCardProps) {
  const displayTags = tool.tags.slice(0, 3);

  return (
    <Link to={`/tools/${tool.slug}`} className="tool-card">
      <div className="tool-card-header">
        <h3 className="tool-card-name">{tool.name}</h3>
        <span className="tool-badge tool-badge-mode">{installModeLabel(tool.installMode)}</span>
      </div>
      <p className="tool-card-tagline">{tool.tagline}</p>
      <div className="tool-badges">
        {displayTags.map((tag) => (
          <span key={tag} className="tool-badge tool-badge-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="tool-card-footer">
        <span className="tool-card-link">Install →</span>
      </div>
    </Link>
  );
}

export default ToolCard;
