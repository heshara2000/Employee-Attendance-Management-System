// src/components/AttendanceLogs.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const AttendanceLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get('/attendance/attendance-logs');
        setLogs(res.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch logs');
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="logs-container">
      <h3>My Attendance Logs</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {logs.length > 0 ? (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              🟢 Check-in: {new Date(log.check_in).toLocaleString()} <br />
              🔴 Check-out: {log.check_out ? new Date(log.check_out).toLocaleString() : 'Not checked out yet'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendance logs available.</p>
      )}
    </div>
  );
};

export default AttendanceLogs;
