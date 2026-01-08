import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ResearchPage from './pages/ResearchPage';
import ContactPage from './pages/ContactPage';
import SchedulePage from './pages/SchedulePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/schedule-an-interview" element={<SchedulePage />} />
      </Routes>
    </Router>
  );
}

export default App;

