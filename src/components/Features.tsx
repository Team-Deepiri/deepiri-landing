import { useState } from 'react';
import './Features.css';
import ResearchModal from './ResearchModal';
import { researchAreas } from '../data/researchData';

function Features() {
  const [selectedResearch, setSelectedResearch] = useState<number | null>(null);

  return (
    <section id="research" className="features">
      <div className="container">
        <div className="features-header">
          <h2 className="features-title">Research Areas</h2>
          <p className="features-subtitle">
            Exploring the frontiers of AI, cloud productivity, and autonomous systems
          </p>
        </div>
        <div className="features-grid">
          {researchAreas.map((area, index) => (
            <div 
              key={index} 
              className="feature-card clickable"
              onClick={() => setSelectedResearch(index)}
            >
              <h3 className="feature-title">{area.title}</h3>
              <p className="feature-description">{area.description}</p>
              <span className="card-arrow">Learn More →</span>
            </div>
          ))}
        </div>
        <div className="features-cta-link">
          <a href="/research" className="btn-features-link">
            Explore Research →
          </a>
        </div>
      </div>

      {selectedResearch !== null && (
        <ResearchModal
          isOpen={true}
          onClose={() => setSelectedResearch(null)}
          title={researchAreas[selectedResearch].title}
          content={researchAreas[selectedResearch].details}
        />
      )}
    </section>
  );
}

export default Features;

