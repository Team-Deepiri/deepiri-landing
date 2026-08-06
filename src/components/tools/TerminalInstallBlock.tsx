import { useMemo, useState } from 'react';
import type { TerminalOs, ToolEntry } from '../../data/toolsCatalog';
import './tools.css';

interface TerminalInstallBlockProps {
  terminal: NonNullable<ToolEntry['terminal']>;
}

const OS_TABS: { key: TerminalOs; label: string; icon: string }[] = [
  { key: 'linux', label: 'Linux', icon: '🐧' },
  { key: 'mac', label: 'macOS', icon: '🍎' },
  { key: 'windows', label: 'Windows', icon: '🪟' },
];

function detectDefaultOs(available: TerminalOs[]): TerminalOs {
  if (typeof navigator === 'undefined') {
    return available[0] ?? 'linux';
  }

  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform ?? '').toLowerCase();

  let guessed: TerminalOs = 'linux';
  if (ua.includes('win') || platform.includes('win')) {
    guessed = 'windows';
  } else if (ua.includes('mac') || platform.includes('mac')) {
    guessed = 'mac';
  }

  return available.includes(guessed) ? guessed : available[0] ?? 'linux';
}

function getOsTabs(
  commandsByOs: Partial<Record<TerminalOs, string[]>> | undefined,
): TerminalOs[] {
  if (!commandsByOs) {
    return [];
  }
  return OS_TABS.map(({ key }) => key).filter(
    (key) => (commandsByOs[key]?.length ?? 0) > 0,
  );
}

function resolveCommands(
  terminal: NonNullable<ToolEntry['terminal']>,
  os: TerminalOs,
): string[] {
  const byOs = terminal.commandsByOs?.[os];
  if (byOs && byOs.length > 0) {
    return byOs;
  }
  return terminal.commands ?? [];
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

function TerminalCommandPanel({ commands }: { commands: string[] }) {
  const allCommands = commands.join('\n');

  return (
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
        {commands.map((line, index) => {
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
  );
}

function TerminalInstallBlock({ terminal }: TerminalInstallBlockProps) {
  const osTabs = useMemo(() => getOsTabs(terminal.commandsByOs), [terminal.commandsByOs]);
  const showOsTabs = osTabs.length >= 2;
  const [selectedOs, setSelectedOs] = useState<TerminalOs>(() =>
    detectDefaultOs(osTabs.length > 0 ? osTabs : ['linux']),
  );

  const activeOs = showOsTabs && osTabs.includes(selectedOs) ? selectedOs : osTabs[0] ?? 'linux';
  const activeCommands = resolveCommands(terminal, activeOs);
  const fallbackCommands = terminal.commands?.join('\n') ?? terminal.oneLiner ?? '';

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

      {terminal.type === 'commands' && (activeCommands.length > 0 || fallbackCommands) && (
        <>
          {showOsTabs && (
            <div className="terminal-os-tabs" role="tablist" aria-label="Operating system">
              {OS_TABS.filter(({ key }) => osTabs.includes(key)).map(({ key, label, icon }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeOs === key}
                  className={`terminal-os-tab${activeOs === key ? ' active' : ''}`}
                  onClick={() => setSelectedOs(key)}
                >
                  <span aria-hidden="true">{icon}</span> {label}
                </button>
              ))}
            </div>
          )}
          <TerminalCommandPanel commands={activeCommands} />
        </>
      )}

      {terminal.verifyCommand && (
        <div className="verify-block">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <p className="verify-label" style={{ margin: 0 }}>
              Verify installation
            </p>
            <CopyButton text={terminal.verifyCommand} label="Copy" />
          </div>
          <code className="verify-command">{terminal.verifyCommand}</code>
        </div>
      )}
    </section>
  );
}

export default TerminalInstallBlock;
