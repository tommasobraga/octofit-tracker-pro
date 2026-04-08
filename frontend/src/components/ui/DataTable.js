import React from 'react';

export default function DataTable({ columns, rows, emptyMsg = 'No data found.' }) {
  return (
    <div className="table-responsive">
      <table className="table octofit-table">
        <thead>
          <tr>{columns.map(col => <th key={col.label}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">{emptyMsg}</td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map(col => (
                  <td key={col.label}>{col.render(row, i)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
