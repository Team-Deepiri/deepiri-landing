import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutPage.css';

function AboutPage() {
  useEffect(() => {
    document.title = 'About - Deepiri';
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="about-page">
        <div className="container">
          <div className="about-hero">
            <h1 className="about-title">About Deepiri</h1>
            <p className="about-subtitle">
              An independent AI research and development collective
            </p>
          </div>

          <section className="about-section">
            <div className="about-content">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-text">
                Deepiri is an independent AI research and development group focused on exploring 
                the intersection of modular microservice architecture, generative intelligence, 
                and adaptive human and AI interaction.
              </p>
              <p className="section-text">
                Our research spans media ingestion, automation, digital productivity, and cognitive 
                computing, with a focus on creating scalable, autonomous, and creative AI-driven frameworks.
              </p>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Our Team</h2>
            <div className="team-info">
              <p className="section-text">
                Deepiri is powered by a diverse team of 35+ developers and researchers from 
                leading institutions including Yale, Carnegie Mellon University (CMU), Brown, 
                University of Waterloo, and other top universities worldwide.
              </p>
              <p className="section-text">
                Our collective brings together expertise in AI, machine learning, distributed 
                systems, and human-computer interaction, enabling us to tackle complex research 
                challenges at the intersection of technology and productivity.
              </p>
            </div>
            <div className="team-links">
              <a 
                href="https://github.com/team-deepiri" 
                target="_blank" 
                rel="noopener noreferrer"
                className="team-link"
              >
                View Our GitHub
              </a>
              <a 
                href="https://linkedin.com/company/deepiri" 
                target="_blank" 
                rel="noopener noreferrer"
                className="team-link"
              >
                Connect on LinkedIn
              </a>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-title">Our Approach</h2>
            <div className="approach-list">
              <div className="approach-item">
                <h3 className="approach-title">Independent Research</h3>
                <p className="approach-text">
                  We operate as an independent collective, free to explore innovative 
                  ideas and push the boundaries of what's possible.
                </p>
              </div>
              <div className="approach-item">
                <h3 className="approach-title">Everyone has Potential</h3>
                <p className="approach-text">
                  We believe that everyone has potential and value upskilling our team.
                </p>
              </div>
              <div className="approach-item">
                <h3 className="approach-title">Practical Innovation</h3>
                <p className="approach-text">
                  Our research is grounded in real-world applications, focusing on 
                  systems that can be deployed and scaled effectively.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;

