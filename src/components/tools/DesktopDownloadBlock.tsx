import type { ToolEntry } from '../../data/toolsCatalog';
import OsLogo, { type OsLogoKey } from './OsLogo';
import './tools.css';

interface DesktopDownloadBlockProps {
  desktop: NonNullable<ToolEntry['desktop']>;
}

const OS_CONFIG: { key: OsLogoKey; label: string }[] = [
  { key: 'mac', label: 'macOS' },
  { key: 'linux', label: 'Linux' },
  { key: 'windows', label: 'Windows' },
];

function buildDownloadUrl(releaseRepo: string, asset: string): string {
  return `https://github.com/${releaseRepo}/releases/latest/download/${asset}`;
}

function DesktopDownloadBlock({ desktop }: DesktopDownloadBlockProps) {
  const releaseRepo = desktop.releaseRepo ?? '';
  const isComingSoon = desktop.comingSoon === true;

  return (
    <section className="install-section">
      <h2 className="install-section-title">Desktop download</h2>
      <p className="install-section-desc">
        {isComingSoon
          ? `Installers for ${desktop.productName} are being prepared. Check back soon or build from source via the terminal section.`
          : `Download ${desktop.productName} for your operating system.`}
      </p>

      {desktop.prerequisites && desktop.prerequisites.length > 0 && (
        <>
          <p className="install-section-desc" style={{ marginBottom: '0.75rem' }}>
            Prerequisites:
          </p>
          <ul className="prerequisites-list">
            {desktop.prerequisites.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}

      <div className="desktop-downloads">
        {OS_CONFIG.map(({ key, label }) => {
          const asset = desktop.assets[key];
          const hasAsset = Boolean(asset) && !isComingSoon;
          const href = hasAsset && asset ? buildDownloadUrl(releaseRepo, asset) : undefined;

          if (!asset && !isComingSoon) {
            return null;
          }

          if (hasAsset && href) {
            return (
              <a
                key={key}
                href={href}
                className="download-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="download-btn-os">
                  <OsLogo os={key} />
                  {label}
                </span>
                <span className="download-btn-label">Download</span>
              </a>
            );
          }

          return (
            <div key={key} className="download-btn download-btn-disabled" aria-disabled="true">
              <span className="download-btn-os">
                <OsLogo os={key} />
                {label}
              </span>
              <span className="download-btn-coming-soon">Coming soon</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DesktopDownloadBlock;
