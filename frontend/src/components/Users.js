import React from 'react';
import { useFetch } from '../hooks/useFetch';
import PageShell from './ui/PageShell';
import DataTable from './ui/DataTable';

const COLUMNS = [
  { label: 'Name',  render: u => u.name || '—' },
  { label: 'Email', render: u => u.email || '—' },
];

export default function Users() {
  const { data, loading, error } = useFetch('users');
  return (
    <PageShell title="👤 Users" loading={loading} error={error} resource="users">
      <DataTable columns={COLUMNS} rows={data} emptyMsg="No users found." />
    </PageShell>
  );
}
