// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import CheckInOut from './components/CheckInOut';
// import AttendanceLogs from './components/AttendanceLogs';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   const [role, setRole] = useState(localStorage.getItem('role') || '');

//   const handleLogin = (userRole) => {
//     setRole(userRole);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   return (
//     <div className="App">
//       {!role && <LoginForm onLogin={handleLogin} />}

//       {role === 'employee' && (
//         <>
//           <h2>Employee Dashboard</h2>
//           <CheckInOut />
//           <AttendanceLogs />
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       )}

//       {role === 'admin' && (
//         <>
//           <h2>Admin Dashboard</h2>
//           <AdminDashboard />
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
// src/App.js

import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginForm';
import CheckInOut from './components/CheckInOut';
import MyLogs from './components/MyLogs';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (loggedInRole) => {
    setRole(loggedInRole);
    setToken(localStorage.getItem('token')); // Update token from localStorage
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div>
      <button onClick={handleLogout} style={{ float: 'right', margin: '1rem' }}>
        Logout
      </button>
      {role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <>
          <CheckInOut />
          <MyLogs />
        </>
      )}
    </div>
  );
}

export default App;





