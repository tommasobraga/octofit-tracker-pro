import React from 'react';
import { useFetch } from '../hooks/useFetch';
import PageShell from './ui/PageShell';
import DataTable from './ui/DataTable';

const formatMembers = t =>
  Array.isArray(t.members)
    ? t.members.map(m => m.name || String(m)).join(', ') || '—'
    : t.members || '—';

const COLUMNS = [
  { label: 'Team Name', render: t => t.name || '—' },
  { label: 'Members',   render: formatMembers },
];

export default function Teams() {
  const { data, loading, error } = useFetch('teams');
  return (
    <PageShell title="👥 Teams" loading={loading} error={error} resource="teams">
      <DataTable columns={COLUMNS} rows={data} emptyMsg="No teams found." />
    </PageShell>
  );
}
