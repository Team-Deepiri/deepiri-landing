import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            AI R&D Collective for
            <span className="gradient-text"> Cloud Productivity</span>
          </h1>
          <p className="hero-description">
            Deepiri is an independent AI research and development group focused on exploring the intersection 
            of modular microservice architecture, generative intelligence, and adaptive human and AI interaction. 
            Our research spans media ingestion, automation, digital productivity, and cognitive computing, with a 
            focus on creating scalable, autonomous, and creative AI-driven frameworks.
          </p>
          <div className="hero-cta">
            <a href="/research" className="btn-hero-primary">
              Explore Research
            </a>
            <a href="/about" className="btn-hero-secondary">
              Learn More
            </a>
          </div>
          <div className="hero-stats">
          <div className="stat">
              <div className="stat-number">R&D</div>
              <div className="stat-label">Research Focused Initiative</div>
            </div>
            <div className="stat">
              <div className="stat-number">35+</div>
              <div className="stat-label">Developer Team on GitHub</div>
            </div>
            <div className="stat">
              <div className="stat-number">AI-Driven</div>
              <div className="stat-label">Autonomous Systems</div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

