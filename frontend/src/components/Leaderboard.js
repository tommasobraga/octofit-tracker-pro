import React from 'react';
import { useFetch } from '../hooks/useFetch';
import PageShell from './ui/PageShell';
import DataTable from './ui/DataTable';

const rankClass = i => `rank-badge rank-${i < 3 ? i + 1 : 'other'}`;

const COLUMNS = [
  { label: 'Rank',  render: (_, i) => <span className={rankClass(i)}>{i + 1}</span> },
  { label: 'User',  render: e => e.user?.name || e.user?.username || '—' },
  { label: 'Score', render: e => e.score ?? '—' },
];

export default function Leaderboard() {
  const { data, loading, error } = useFetch('leaderboard');
  return (
    <PageShell title="🏆 Leaderboard" loading={loading} error={error} resource="leaderboard">
      <DataTable columns={COLUMNS} rows={data} emptyMsg="No leaderboard entries found." />
    </PageShell>
  );
}
