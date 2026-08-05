import { useState } from 'react';
import type { ToolEntry } from '../../data/toolsCatalog';
import './tools.css';

interface PackageDownloadBlockProps {
  pkg: NonNullable<ToolEntry['package']>;
}

function buildDownloadUrl(releaseRepo: string, asset: string): string {
  return `https://github.com/${releaseRepo}/releases/latest/download/${asset}`;
}

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      className={`copy-btn${copied ? ' copied' : ''}`}
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
    >
      {copied ? 'Copied!' : label}
    </button>
  );
}

function PackageDownloadBlock({ pkg }: PackageDownloadBlockProps) {
  const href = buildDownloadUrl(pkg.releaseRepo, pkg.asset);
  const fallbackCommands = pkg.fallbackCommands ?? [];
  const fallbackText = fallbackCommands.join('\n');

  return (
    <section className="install-section">
      <h2 className="install-section-title">Package download</h2>
      <p className="install-section-desc">
        Download the {pkg.label}, or install with pip / git below.
      </p>

      <div className="desktop-downloads">
        <a
          href={href}
          className="download-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="download-btn-os">{pkg.label}</span>
          <span className="download-btn-label">{pkg.asset}</span>
        </a>
      </div>

      {fallbackCommands.length > 0 && (
        <div className="package-fallback">
          <p className="install-section-desc" style={{ marginBottom: '0.75rem' }}>
            Or install via pip / git:
          </p>
          <div className="terminal-panel">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
              </div>
              <CopyButton text={fallbackText} label="Copy all" />
            </div>
            <div className="terminal-body">
              {fallbackCommands.map((line, index) => {
                const isComment = line.trimStart().startsWith('#');
                return (
                  <div key={`${index}-${line}`} className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className={isComment ? 'terminal-comment' : 'terminal-command'}>
                      {line}
                    </span>
                    {!isComment && (
                      <span className="terminal-line-actions">
                        <CopyButton text={line} />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PackageDownloadBlock;
