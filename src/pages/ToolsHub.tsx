import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolCard from '../components/tools/ToolCard';
import {
  filterTools,
  type ToolFilter,
} from '../data/toolsCatalog';
import './ToolsHub.css';

const FILTERS: { id: ToolFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'cli', label: 'CLI' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'platform', label: 'Platform' },
];

function ToolsHub() {
  const [activeFilter, setActiveFilter] = useState<ToolFilter>('all');
  const tools = filterTools(activeFilter);

  useEffect(() => {
    document.title = 'Tools - Deepiri';
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="tools-page">
        <div className="container">
          <div className="tools-hero">
            <h1 className="tools-hero-title">Install Deepiri Tools</h1>
            <p className="tools-hero-subtitle">
              One place to install every major Deepiri product — CLI, desktop, and platform tools.
            </p>
          </div>

          <div className="tools-filters">
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`tools-filter-btn${activeFilter === id ? ' active' : ''}`}
                onClick={() => setActiveFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="tools-count">
            {tools.length} tool{tools.length !== 1 ? 's' : ''}
          </p>

          <div className="tools-grid">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ToolsHub;
