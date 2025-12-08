import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResearchModal from '../components/ResearchModal';
import { researchAreas } from '../data/researchData';
import './ResearchPage.css';

const badges = ['Infrastructure', 'AI/ML', 'HCI', 'Platform', 'Autonomy', 'Media'];

function ResearchPage() {
  const [selectedResearch, setSelectedResearch] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Research & Development - Deepiri';
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="research-page">
        <div className="container">
          <div className="research-hero">
            <h1 className="research-hero-title">Research & Development</h1>
            <p className="research-hero-subtitle">
              Exploring the frontiers of AI, cloud productivity, and autonomous systems
            </p>
          </div>

          <section className="research-section">
            <h2 className="section-title">Core Research Domains</h2>
            
            {researchAreas.map((area, index) => (
              <div 
                key={index} 
                className="domain-card clickable"
                onClick={() => setSelectedResearch(index)}
              >
                <div className="domain-header">
                  <h3 className="domain-title">{area.title}</h3>
                  <span className="domain-badge">{badges[index]}</span>
                </div>
                <p className="domain-description">
                  {area.details.overview}
                </p>
                <ul className="domain-topics">
                  {area.details.keyAreas.slice(0, 4).map((keyArea, i) => (
                    <li key={i}>{keyArea}</li>
                  ))}
                </ul>
                <span className="domain-arrow">Click to learn more →</span>
              </div>
            ))}
          </section>

          <section className="research-section">
            <h2 className="section-title">Research Methodology</h2>
            <div className="methodology-grid">
              <div className="methodology-item">
                <h3 className="methodology-title">Experimental Development</h3>
                <p className="methodology-text">
                  We build working prototypes to validate research hypotheses 
                  and explore practical implementations.
                </p>
              </div>
              <div className="methodology-item">
                <h3 className="methodology-title">Private Contributions</h3>
                <p className="methodology-text">
                 We are a closed source collective and do not release any of our code publicly.
                </p>
              </div>
              <div className="methodology-item">
                <h3 className="methodology-title">Collaborative Research</h3>
                <p className="methodology-text">
                  We collaborate with academic institutions, industry partners, 
                  and independent researchers.
                </p>
              </div>
              <div className="methodology-item">
                <h3 className="methodology-title">Iterative Refinement</h3>
                <p className="methodology-text">
                  Our research follows an iterative cycle of design, implementation, 
                  evaluation, and refinement.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      {selectedResearch !== null && (
        <ResearchModal
          isOpen={true}
          onClose={() => setSelectedResearch(null)}
          title={researchAreas[selectedResearch].title}
          content={researchAreas[selectedResearch].details}
        />
      )}
    </div>
  );
}

export default ResearchPage;

