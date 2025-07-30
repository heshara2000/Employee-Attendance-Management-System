// // src/components/AttendanceLogs.js
// import React, { useEffect, useState } from 'react';
// import API from '../api';

// const AttendanceLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await API.get('/attendance/attendance-logs');
//         setLogs(res.data);
//       } catch (err) {
//         setError(err.response?.data?.detail || 'Failed to fetch logs');
//       }
//     };

//     fetchLogs();
//   }, []);

//   return (
//     <div className="logs-container">
//       <h3>My Attendance Logs</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {logs.length > 0 ? (
//         <ul>
//           {logs.map((log, index) => (
//             <li key={index}>
//               🟢 Check-in: {new Date(log.check_in).toLocaleString()} <br />
//               🔴 Check-out: {log.check_out ? new Date(log.check_out).toLocaleString() : 'Not checked out yet'}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No attendance logs available.</p>
//       )}
//     </div>
//   );
// };

// export default AttendanceLogs;

import React, { useEffect, useState } from 'react';
import axios from '../api';

function MyLogs() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/attendance/my-logs');
        setLogs(response.data);
      } catch (err) {
        setError('Failed to fetch logs');
        console.error(err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 My Attendance Logs</h2>
      {error && <p className="text-red-600">{error}</p>}
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Check-in</th>
              <th className="p-2">Check-out</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="p-2">{log.id}</td>
                <td className="p-2">{log.check_in ? new Date(log.check_in).toLocaleString() : '-'}</td>
                <td className="p-2">{log.check_out ? new Date(log.check_out).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyLogs;
