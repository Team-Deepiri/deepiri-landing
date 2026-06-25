import { useState } from 'react';
import type { ToolEntry } from '../../data/toolsCatalog';
import './tools.css';

interface TerminalInstallBlockProps {
  terminal: NonNullable<ToolEntry['terminal']>;
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

function TerminalInstallBlock({ terminal }: TerminalInstallBlockProps) {
  const allCommands = terminal.commands?.join('\n') ?? terminal.oneLiner ?? '';

  return (
    <section className="install-section">
      <h2 className="install-section-title">Terminal install</h2>
      <p className="install-section-desc">
        {terminal.type === 'curl'
          ? 'Run this one-liner in your terminal to install from the official script.'
          : 'Copy and run these commands in your terminal.'}
      </p>

      {terminal.prerequisites && terminal.prerequisites.length > 0 && (
        <>
          <p className="install-section-desc" style={{ marginBottom: '0.75rem' }}>
            Prerequisites:
          </p>
          <ul className="prerequisites-list">
            {terminal.prerequisites.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {terminal.type === 'curl' && terminal.oneLiner && (
        <div className="curl-block">
          <pre className="curl-oneliner">{terminal.oneLiner}</pre>
          <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <CopyButton text={terminal.oneLiner} />
          </div>
        </div>
      )}

      {terminal.type === 'commands' && terminal.commands && (
        <div className="terminal-panel">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
            </div>
            <CopyButton text={allCommands} label="Copy all" />
          </div>
          <div className="terminal-body">
            {terminal.commands.map((line, index) => {
              const isComment = line.trimStart().startsWith('#');
              return (
                <div key={`${index}-${line}`} className="terminal-line">
                  <span className="terminal-prompt">$</span>
                  <span
                    className={isComment ? 'terminal-comment' : 'terminal-command'}
                  >
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
      )}

      {terminal.verifyCommand && (
        <div className="verify-block">
          <p className="verify-label">Verify installation</p>
          <code className="verify-command">{terminal.verifyCommand}</code>
        </div>
      )}
    </section>
  );
}

export default TerminalInstallBlock;
