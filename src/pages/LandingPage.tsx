import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Team from '../components/Team';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import '../App.css';

function LandingPage() {
  useEffect(() => {
    document.title = 'Deepiri - AI R&D Collective for Cloud Productivity';
  }, []);

  return (
    <div className="app">
      <Header />
      <Hero />
      <Features />
      <Team />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;

