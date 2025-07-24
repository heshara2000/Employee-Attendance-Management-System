// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await API.get('/admin/attendance-logs');
        setRecords(res.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load admin records');
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="admin-dashboard">
      <h3>Admin Attendance Dashboard</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {records.length > 0 ? (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Check-in</th>
              <th>Check-out</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, index) => (
              <tr key={index}>
                <td>{rec.username}</td>
                <td>{new Date(rec.check_in).toLocaleString()}</td>
                <td>{rec.check_out ? new Date(rec.check_out).toLocaleString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records to show.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
