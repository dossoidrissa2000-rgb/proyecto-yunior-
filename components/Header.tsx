
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-surface border-b border-gray-800 p-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-white tracking-wider">
          <span className="text-brand-blue">Y</span>unior
          <span className="text-brand-red text-3xl">.</span>
        </h1>
        <p className="text-sm text-brand-muted">AI-Powered Project Assistant</p>
      </div>
    </header>
  );
};
