import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ContactPage.css';

function ContactPage() {
  useEffect(() => {
    document.title = 'Contact - Deepiri';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="app">
      <Header />
      <main className="contact-page">
        <div className="container">
          <div className="contact-hero">
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">
              Interested in collaboration, research partnerships, or learning more about our work?
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h2 className="info-title">Contact Information</h2>
              <div className="info-item">
                <div className="info-text">
                  <h3 className="info-label">General Inquiries</h3>
                  <p className="info-value">
                    <a href="mailto:management@deepiri.com">management@deepiri.com</a>
                  </p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-text">
                  <h3 className="info-label">GitHub</h3>
                  <p className="info-value">
                    <a href="https://github.com/team-deepiri" target="_blank" rel="noopener noreferrer">
                      github.com/team-deepiri
                    </a>
                  </p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-text">
                  <h3 className="info-label">LinkedIn</h3>
                  <p className="info-value">
                    <a href="https://linkedin.com/company/deepiri" target="_blank" rel="noopener noreferrer">
                      linkedin.com/company/deepiri
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-ways">
                <h3 className="ways-title">Ways to Connect</h3>
                <ul className="ways-list">
                  <li>Research collaboration opportunities</li>
                  <li>Academic partnerships</li>
                  <li>Industry collaborations</li>
                  <li>General inquiries</li>
                </ul>
              </div>
            </div>

            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="research">Research Collaboration</option>
                    <option value="partnership">Partnership</option>
                    <option value="general">General Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows={6}
                    required
                  />
                </div>

                <button type="submit" className="form-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ContactPage;

