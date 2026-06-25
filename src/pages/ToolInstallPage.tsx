import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TerminalInstallBlock from '../components/tools/TerminalInstallBlock';
import DesktopDownloadBlock from '../components/tools/DesktopDownloadBlock';
import { getToolBySlug, installModeLabel } from '../data/toolsCatalog';
import './ToolInstallPage.css';

function ToolInstallPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;

  useEffect(() => {
    document.title = tool ? `Install ${tool.name} - Deepiri` : 'Tool Not Found - Deepiri';
  }, [tool]);

  if (!tool) {
    return (
      <div className="app">
        <Header />
        <main className="tool-install-page">
          <div className="container">
            <div className="tool-not-found">
              <h1>Tool not found</h1>
              <p>No install page exists for &ldquo;{slug}&rdquo;.</p>
              <Link to="/tools" className="tool-back-link">
                ← Back to all tools
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const githubUrl = `https://github.com/${tool.repo}`;
  const showTerminal =
    tool.terminal && (tool.installMode === 'terminal' || tool.installMode === 'both');
  const showDesktop =
    tool.desktop && (tool.installMode === 'desktop' || tool.installMode === 'both');

  return (
    <div className="app">
      <Header />
      <main className="tool-install-page">
        <div className="container">
          <Link to="/tools" className="tool-breadcrumb">
            ← All tools
          </Link>

          <div className="tool-hero">
            <div className="tool-hero-header">
              <h1 className="tool-hero-title">{tool.name}</h1>
              <span className="tool-hero-mode">{installModeLabel(tool.installMode)}</span>
            </div>
            <p className="tool-hero-tagline">{tool.tagline}</p>
            <div className="tool-hero-tags">
              {tool.tags.map((tag) => (
                <span key={tag} className="tool-hero-tag">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-github-link"
            >
              View on GitHub →
            </a>
          </div>

          {showTerminal && <TerminalInstallBlock terminal={tool.terminal!} />}
          {showDesktop && <DesktopDownloadBlock desktop={tool.desktop!} />}

          {tool.researchLink && (
            <section className="tool-related">
              <h2 className="install-section-title">Related</h2>
              <p className="install-section-desc">
                Learn more about the research behind {tool.name} on our Research page.
              </p>
              <Link to="/research" className="tool-back-link">
                Research & Development →
              </Link>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ToolInstallPage;
