// src/components/AdminDashboard.js
// import React, { useEffect, useState } from 'react';
// import API from '../api';

// const AdminDashboard = () => {
//   const [records, setRecords] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchRecords = async () => {
//       try {
//         const res = await API.get('/admin/attendance-logs');
//         setRecords(res.data);
//       } catch (err) {
//         setError(err.response?.data?.detail || 'Failed to load admin records');
//       }
//     };

//     fetchRecords();
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <h3>Admin Attendance Dashboard</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {records.length > 0 ? (
//         <table border="1" cellPadding="5">
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>Check-in</th>
//               <th>Check-out</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((rec, index) => (
//               <tr key={index}>
//                 <td>{rec.username}</td>
//                 <td>{new Date(rec.check_in).toLocaleString()}</td>
//                 <td>{rec.check_out ? new Date(rec.check_out).toLocaleString() : '—'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No records to show.</p>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from '../api';

function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllLogs = async () => {
      try {
        const response = await axios.get('/admin/attendance-records');
        setLogs(response.data);
      } catch (err) {
        setError('Failed to fetch attendance records');
        console.error(err);
      }
    };

    fetchAllLogs();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Admin Dashboard - All Attendance Records</h2>
      {error && <p className="text-red-600">{error}</p>}
      {logs.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Log ID</th>
              <th className="p-2">Employee ID</th>
              <th className="p-2">Check-in</th>
              <th className="p-2">Check-out</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="p-2">{log.id}</td>
                <td className="p-2">{log.employee_id}</td>
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

export default AdminDashboard;
