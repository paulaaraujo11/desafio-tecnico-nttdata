import React from 'react';

const styles = `
.logo-spin {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    animation: spin 2s linear infinite;
}
@keyframes spin {
    100% { transform: rotate(360deg); }
}
`;

if (typeof document !== 'undefined') {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
}

export default function AnimatedLogo() {
  return (
    <div className="logo-spin">
      <svg width="60" height="60" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#2196f3" strokeWidth="8" fill="none" />
        <text x="50%" y="55%" textAnchor="middle" fill="#2196f3" fontSize="30" fontFamily="Arial" dy=".3em">🎵</text>
      </svg>
    </div>
  );
}