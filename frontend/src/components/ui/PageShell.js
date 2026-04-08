import React from 'react';

export default function PageShell({ title, loading, error, resource, children }) {
  if (loading) return (
    <div className="loading-container">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (error) return (
    <div className="alert alert-danger">Error loading {resource}: {error}</div>
  );
  return (
    <div>
      <h2 className="page-title">{title}</h2>
      {children}
    </div>
  );
}
