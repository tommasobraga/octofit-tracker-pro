import React from 'react';
import { useFetch } from '../hooks/useFetch';
import PageShell from './ui/PageShell';
import DataTable from './ui/DataTable';

const COLUMNS = [
  { label: 'User',          render: a => a.user?.name || '—' },
  { label: 'Activity Type', render: a => <span className="activity-badge">{a.activity_type || '—'}</span> },
  { label: 'Duration',      render: a => a.duration ? `${a.duration} min` : '—' },
  { label: 'Date',          render: a => a.date ? new Date(a.date).toLocaleDateString() : '—' },
];

export default function Activities() {
  const { data, loading, error } = useFetch('activities');
  return (
    <PageShell title="🏃 Activities" loading={loading} error={error} resource="activities">
      <DataTable columns={COLUMNS} rows={data} emptyMsg="No activities found." />
    </PageShell>
  );
}
