import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './SchedulePage.css';

function SchedulePage() {
  useEffect(() => {
    document.title = 'Schedule an Interview - Deepiri';
  }, []);

  const openCalendar = () => {
    const width = 1000;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      'https://calendar.app.google/iUJbUw9inwviKk71A',
      'Google Calendar',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <div className="app">
      <Header />
      <main className="schedule-page">
        <div className="container">
          <div className="schedule-hero">
            <h1 className="schedule-title">Schedule an Interview</h1>
            <p className="schedule-subtitle">
              Book a time to speak with our founder about collaboration, partnerships, or research opportunities
            </p>
          </div>

          <div className="schedule-content">
            <div className="schedule-info">
              <h2 className="info-title">Book Your Time</h2>
              <p className="info-text">
                Use the calendar below to select an available time slot that works for you. 
                We're excited to discuss how we can work together.
              </p>
              <div className="schedule-features">
                <div className="feature-item">
                  <h3>Research Collaboration</h3>
                  <p>Discuss potential research partnerships and collaborations</p>
                </div>
                <div className="feature-item">
                  <h3>Academic Partnerships</h3>
                  <p>Explore opportunities for academic institutions</p>
                </div>
                <div className="feature-item">
                  <h3>Industry Connections</h3>
                  <p>Connect about industry partnerships and opportunities</p>
                </div>
              </div>
            </div>

            <div className="calendar-container">
              <div className="calendar-preview">
                <div className="calendar-preview-content">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="calendar-icon">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
                  </svg>
                  <h3>Schedule Your Interview</h3>
                  <p>Click the button below to open the calendar and select your preferred time slot</p>
                  <button onClick={openCalendar} className="calendar-open-button">
                    Open Scheduling Calendar
                  </button>
                </div>
              </div>
              <div className="calendar-fallback">
                <p className="fallback-text">
                  Or{' '}
                  <a 
                    href="https://calendar.app.google/iUJbUw9inwviKk71A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="fallback-link"
                  >
                    open in a new tab
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SchedulePage;

