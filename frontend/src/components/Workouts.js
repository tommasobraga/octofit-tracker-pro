import React from 'react';
import { useFetch } from '../hooks/useFetch';
import PageShell from './ui/PageShell';

export default function Workouts() {
  const { data, loading, error } = useFetch('workouts');
  return (
    <PageShell title="💪 Workouts" loading={loading} error={error} resource="workouts">
      <div className="workout-grid">
        {data.map((w, i) => (
          <div className="workout-card" key={w.id || i}>
            <h5>{w.name}</h5>
            <p>{w.description}</p>
            <span className="workout-duration">⏱ {w.duration} min</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
