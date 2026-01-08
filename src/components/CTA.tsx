import './CTA.css';

function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Interested in Our Research?</h2>
          <p className="cta-description">
            We're always open to collaboration, partnerships, and discussions about AI research, 
            cloud productivity, and autonomous systems.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-cta-primary">
              Get in Touch
            </a>
            <a href="/research" className="btn-cta-secondary">
              Explore Research
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;

