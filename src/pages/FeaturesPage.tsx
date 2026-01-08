import Header from '../components/Header';
import Footer from '../components/Footer';
import './FeaturesPage.css';

const researchDomains = [
  {
    category: 'Core Research Domains',
    areas: [
      {
        title: 'Modular Microservice Architecture',
        description: 'We research and develop modular architectures that enable flexible, scalable AI systems. Our work focuses on creating microservice patterns that support independent deployment, horizontal scaling, and seamless integration of AI components.',
        topics: [
          'Service decomposition strategies',
          'Inter-service communication patterns',
          'State management in distributed systems',
          'API gateway architectures',
        ],
      },
      {
        title: 'Generative Intelligence',
        description: 'Our research in generative intelligence explores how AI systems can create novel solutions, adapt to new contexts, and generate creative outputs. We investigate both foundational models and specialized generative systems.',
        topics: [
          'Large language model integration',
          'Creative AI systems',
          'Adaptive generation strategies',
          'Multi-modal generation',
        ],
      },
      {
        title: 'Adaptive Human-AI Interaction',
        description: 'We design and study interfaces that enable seamless collaboration between humans and AI systems. Our research focuses on creating adaptive systems that learn from user behavior and preferences.',
        topics: [
          'Conversational interfaces',
          'Adaptive UI/UX patterns',
          'Human-in-the-loop systems',
          'Personalization algorithms',
        ],
      },
      {
        title: 'Cloud Productivity Platforms',
        description: 'Our platform research focuses on building scalable cloud infrastructure that supports distributed AI workloads, real-time collaboration, and efficient resource utilization.',
        topics: [
          'Distributed computing frameworks',
          'Real-time synchronization',
          'Resource orchestration',
          'Multi-tenant architectures',
        ],
      },
      {
        title: 'Autonomous Systems',
        description: 'We research systems that can operate independently while maintaining alignment with human goals. This includes self-managing infrastructure, autonomous agents, and self-healing systems.',
        topics: [
          'Autonomous agent architectures',
          'Self-healing systems',
          'Goal alignment mechanisms',
          'Autonomous decision-making',
        ],
      },
      {
        title: 'Media Ingestion & Automation',
        description: 'Our media research focuses on intelligent systems for processing, organizing, and automating workflows around various media types, from text to multimedia content.',
        topics: [
          'Intelligent content extraction',
          'Automated workflow orchestration',
          'Media transformation pipelines',
          'Content understanding systems',
        ],
      },
    ],
  },
];

function FeaturesPage() {
  return (
    <div className="app">
      <Header />
      <main className="features-page">
        <div className="container">
          <div className="features-hero">
            <h1 className="features-hero-title">Research Domains</h1>
            <p className="features-hero-subtitle">
              Exploring the frontiers of AI, cloud productivity, and autonomous systems
            </p>
          </div>

          {researchDomains.map((domain, domainIndex) => (
            <section key={domainIndex} className="feature-category">
              <div className="category-header">
                <h2 className="category-title">{domain.category}</h2>
              </div>
              <div className="features-grid-detailed">
                {domain.areas.map((area, areaIndex) => (
                  <div key={areaIndex} className="feature-card-detailed">
                    <h3 className="feature-card-title">{area.title}</h3>
                    <p className="feature-card-description">{area.description}</p>
                    <ul className="feature-details">
                      {area.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="feature-detail-item">
                          <span className="detail-icon">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="features-cta">
            <h2 className="cta-title">Interested in Collaboration?</h2>
            <p className="cta-text">
              We're open to research partnerships, academic collaborations, and discussions about our work.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-cta-primary">
                Contact Us
              </a>
              <a href="/research" className="btn-cta-secondary">
                Learn More
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FeaturesPage;

