import { useEffect } from 'react';
import './ResearchModal.css';

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    overview: string;
    keyAreas: string[];
    applications: string[];
  };
}

function ResearchModal({ isOpen, onClose, title, content }: ResearchModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ transform: 'translateZ(0)' }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3 className="modal-section-title">Overview</h3>
            <p className="modal-text">{content.overview}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Key Research Areas</h3>
            <ul className="modal-list">
              {content.keyAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Applications</h3>
            <ul className="modal-list">
              {content.applications.map((app, index) => (
                <li key={index}>{app}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchModal;

