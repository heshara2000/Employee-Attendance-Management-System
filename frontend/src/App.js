// src/App.js
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import CheckInOut from './components/CheckInOut';
import AttendanceLogs from './components/AttendanceLogs';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const handleLogin = (userRole) => {
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="App">
      {!role && <LoginForm onLogin={handleLogin} />}

      {role === 'employee' && (
        <>
          <h2>Employee Dashboard</h2>
          <CheckInOut />
          <AttendanceLogs />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {role === 'admin' && (
        <>
          <h2>Admin Dashboard</h2>
          <AdminDashboard />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
