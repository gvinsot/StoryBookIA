import React from 'react';
import './VersionFooter.css';

function VersionFooter({ 
  tagVersion = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev',
  commitVersion = typeof __GIT_COMMIT__ !== 'undefined' ? __GIT_COMMIT__ : 'unknown'
}) {
  return (
    <footer className="version-footer">
      <span className="version-label" aria-label="Version tag">
        Tag: <span className="version-tag">{tagVersion}</span>
      </span>
      <span className="version-separator" aria-hidden="true">|</span>
      <span className="version-label" aria-label="Git commit">
        Commit: <span className="version-commit">{commitVersion}</span>
      </span>
    </footer>
  );
}

export default VersionFooter;