import React from 'react';
import './table.css';

export const CommonTable = ({ data = [], columns = [] }) => {
  return (
      <table className="job-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={col.key || index} className={col.className || ''}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="job-row">
              {columns.map((col, colIndex) => (
                <td
                  key={col.key || colIndex}
                  className={col.className || ''}
                  data-label={col.label}
                >
                  {col.renderCell ? col.renderCell(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  );
};
