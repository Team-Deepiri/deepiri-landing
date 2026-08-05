import { Link } from 'react-router-dom';
import type { ResearchRepo } from '../data/researchRepos';
import { researchRepoIcons } from './researchRepoIcons';

interface ResearchRepoCardProps {
  repo: ResearchRepo;
}

function ResearchRepoCard({ repo }: ResearchRepoCardProps) {
  const icon = researchRepoIcons[repo.iconKey];

  return (
    <div className="repository-card">
      <div className="repository-item">
        <h3 className="repo-title methodology-title">
          {icon}
          <span>{repo.name}</span>
        </h3>
        <p className="methodology-text">{repo.description}</p>
        <div className="repository-actions">
          <a
            href={repo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-action-link"
          >
            GitHub →
          </a>
          {repo.toolSlug && (
            <Link to={`/tools/${repo.toolSlug}`} className="repo-install-btn">
              Install →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResearchRepoCard;
