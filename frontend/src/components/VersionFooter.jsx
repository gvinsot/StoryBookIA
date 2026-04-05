import React from 'react';
import './VersionFooter.css';

function VersionFooter() {
  const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev';
  const commit = typeof __GIT_COMMIT__ !== 'undefined' ? __GIT_COMMIT__ : 'unknown';

  return (
    <footer className="version-footer">
      <span className="version-info">{version}</span>
      <span className="version-separator">|</span>
      <span className="version-commit">{commit}</span>
    </footer>
  );
}

export default VersionFooter;
