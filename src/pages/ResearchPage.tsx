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
                <h3 className="methodology-title">Public Contributions</h3>
                <p className="methodology-text">
                 We are an open source collective, allowing for anyone to contribute to our research and development efforts.
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
          <section className="research-section">
            <h2 className="section-title">Explore Our Git Repositories</h2>
            <div className="methodology-grid">
              <a href="https://github.com/Team-Deepiri/deepiri-platform" target="_blank" rel="noopener noreferrer">
                <div className="repository-item">
                  <h3 className="repo-title methodology-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Deepiri Platform</span>
                  </h3>
                  <p className="methodology-text">
                    The Deepiri Platform is our core open source hub, encompassing the foundational 
                    tools, libraries, and frameworks that power our research and development efforts, such as the Cryex and Helox repositories. 
                    It serves as the backbone for all our experimental prototypes and production systems, 
                    enabling us to rapidly iterate and innovate across various domains of AI and cloud productivity.
                  </p>
                </div>
              </a>
              <a href="https://github.com/Team-Deepiri/diri-cyrex" target="_blank" rel="noopener noreferrer">
                <div className="repository-item">
                  <h3 className="repo-title methodology-title">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="#8A2BE2" strokeWidth="1.5" strokeLinejoin="round"/>
                      
                      <circle cx="12" cy="12" r="2.5" fill="#8A2BE2" stroke="#8A2BE2" strokeWidth="1"/>
                      
                      <circle cx="12" cy="7" r="1" fill="#8A2BE2"/>
                      <circle cx="16.5" cy="14.5" r="1" fill="#8A2BE2"/>
                      <circle cx="7.5" cy="14.5" r="1" fill="#8A2BE2"/>
                      
                      <path d="M12 9V10.5" stroke="#8A2BE2" strokeWidth="1" strokeLinecap="round"/>
                      <path d="M10.5 13L9 14" stroke="#8A2BE2" strokeWidth="1" strokeLinecap="round"/>
                      <path d="M13.5 13L15 14" stroke="#8A2BE2" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    <span>Deepiri Cyrex</span>
                  </h3>
                  <p className="methodology-text">
                    Cyrex is our repository for our production-ready AI platform centered on multi-agent orchestration, 
                    enterprise RAG, and company-specific automation. A flagship capability is Cyrex Guard, which delivers cross-industry 
                    vendor fraud detection through invoice parsing, pricing benchmarks, risk scoring, and an integrated backend/frontend workflow. 
                  </p>
                </div>
              </a>
              <a href="https://github.com/Team-Deepiri/deepiri-language-intelligence-service" target="_blank" rel="noopener noreferrer">
                <div className="repository-item">
                  <h3 className="repo-title methodology-title">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 13H12" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 17H16" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="17" cy="17" r="3" stroke="#8A2BE2" strokeWidth="1.5"/>
                    </svg>
                    <span>Deepiri Intelligence Service</span>
                  </h3>
                  <p className="methodology-text">
                    The Intelligence Service repository contains our natural language processing and understanding tools, 
                    particularly for uploaded documents. It provides advanced capabilities for contract document processing, including 
                    text analysis, version comparison when editing documents, structural extraction, and more.
                  </p>
                </div>
              </a>
              <a href="https://github.com/Team-Deepiri/deepiri-emotion-desktop" target="_blank" rel="noopener noreferrer">
                <div className="repository-item">
                  <h3 className="repo-title methodology-title">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="16" rx="2" stroke="#8A2BE2" strokeWidth="1.5"/>
                      <path d="M3 8H21" stroke="#8A2BE2" strokeWidth="1.5"/>
                      
                      <circle cx="8" cy="14" r="1.5" fill="#8A2BE2"/>
                      <circle cx="16" cy="14" r="1.5" fill="#8A2BE2"/>
                      <circle cx="12" cy="12" r="1" fill="#8A2BE2"/>
                      <path d="M8 14L12 12L16 14" stroke="#8A2BE2" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    <span>Deepiri Emotion IDE</span>
                  </h3>
                  <p className="methodology-text">
                    The Emotion IDE repository is for our AI-powered integrated development environment focused on enhancing 
                    developer productivity and creativity. It provides context-aware AI chat and "Apply to file" capabilities, with optional support for Cyrex and Helox backends 
                    to handle advanced tasks like RAG, pipeline runs, and even API integration.
                  </p>
                </div>
              </a>
              <a href="https://github.com/Team-Deepiri/deepiri-uqe" target="_blank" rel="noopener noreferrer">
                <div className="repository-item">
                  <h3 className="repo-title methodology-title">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="50" cy="50" rx="40" ry="15" stroke="#6366f1" strokeWidth="3" transform="rotate(45 50 50)" opacity="0.6"/>
                      <ellipse cx="50" cy="50" rx="40" ry="15" stroke="#a855f7" strokeWidth="3" transform="rotate(-45 50 50)" opacity="0.6"/>
                      <circle cx="50" cy="50" r="8" fill="#4f46e5">
                        <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                    <span>Deepiri Universal Quantum Engine</span>
                  </h3>
                  <p className="methodology-text">
                    The Universal Quantum Engine (UQE) repository is a research-ready quantum experimentation lab for simulating quantum systems
                    and integrating them with AI. Key features include a pure-NumPy statevector simulator for running 
                    core algorithms, a quantum bridge that provides quantum-inspired tensors 
                    and layers for PyTorch-based machine learning, and 3D interactive renderings using Plotly.
                  </p>
                </div>
              </a>  
              <a href="https://github.com/Team-Deepiri/deepiri-prismpipe" target="_blank" rel="noopener noreferrer">
                <div className="repository-item">
                  <h3 className="repo-title methodology-title">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="3" stroke="#8A2BE2" strokeWidth="1.5"/>
                      
                      <path d="M2 12H9" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
                      
                      <path d="M15 12H22" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M14.5 9.5L19 5" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M14.5 14.5L19 19" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round"/>
                      
                      <circle cx="19" cy="5" r="1" fill="#8A2BE2"/>
                      <circle cx="22" cy="12" r="1" fill="#8A2BE2"/>
                      <circle cx="19" cy="19" r="1" fill="#8A2BE2"/>
                    </svg>
                    <span>Deepiri Prismpipe</span>                    
                  </h3>
                  <p className="methodology-text">
                    Deepiri Prismpipe is a capability-routed API pipeline that treats requests as "Organic Pipes"—persistent computational organisms that live forever, 
                    inherit knowledge, and self-optimize. Its core features include computation deduplication to reuse shared results, intent-based APIs that replace hardcoded endpoints with NLP planning, 
                    and speculative execution via time-splitting. 
                  </p>
                </div>
              </a>
              <a href="https://github.com/Team-Deepiri/diri-persola" target="_blank" rel="noopener noreferrer">
                <div className="repository-item">
                  <h3 className="repo-title methodology-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 21V19C16 16.7909 14.2091 15 12 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="7" r="4" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="19" cy="9" r="3" stroke="#8A2BE2" strokeWidth="1.5"/>
                      <path d="M19 7V9H21" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Deepiri Persola</span>
                  </h3>
                  <p className="methodology-text">
                    The Persola repository is our framework for adding personality to AI agents, providing them with 
                    additional parameters fine-tuned across 4 panels, creativity, personality, thinking, and reliability.
                    It offers Cyrex integration as it spawns agents into Cyrex and supports multiple models like Ollama, OpenAI, and Claude.
                    The goal is to essentially make "AI that feels".
                  </p>
                </div>
              </a>
              <a href="https://github.com/Team-Deepiri/diri-helox" target="_blank" rel="noopener noreferrer">
                <div className="repository-item">
                  <h3 className="repo-title methodology-title">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 7H6M2 12H6M2 17H6" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round"/>
                      
                      <rect x="7" y="5" width="4" height="14" rx="1" stroke="#8A2BE2" strokeWidth="1.5"/>
                      
                      <path d="M11 12H15" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round"/>
                      
                      <circle cx="19" cy="12" r="3" stroke="#8A2BE2" strokeWidth="1.5"/>
                      <circle cx="19" cy="12" r="1" fill="#8A2BE2"/>
                    </svg>
                    <span>Deepiri Helox</span>
                  </h3>
                  <p className="methodology-text">
                    The Helox repository is for our machine learning and data generation and testing system.
                    It includes tools for synthetic data generation, model training pipelines, and evaluation frameworks.
                  </p>
                </div>
              </a>                         
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

