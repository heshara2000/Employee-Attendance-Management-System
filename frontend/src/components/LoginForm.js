// src/components/LoginForm.js
import React, { useState } from 'react';
import API, { setAuthToken } from '../api';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    console.log("🔄 Sending login request with:", { username, password });
    
    const res = await API.post('/auth/token', new URLSearchParams({
      username,
      password,
    }));

    console.log("✅ Login success:", res.data);

    const token = res.data.access_token;
    const userRole = res.data.role; 

    if (!token || !userRole) {
      throw new Error("Missing token or role from backend");
    }

    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setAuthToken(token);
    onLogin(userRole);
  } catch (err) {
    console.error("❌ Login error:", err);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Status:", err.response.status);
    }

    if (err.response && err.response.status === 401) {
      setError('Invalid username or password');
    } else {
      setError('Something went wrong. Please try again.');
    }
  }
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   try {
  //     const res = await API.post('/auth/token', new URLSearchParams({
  //       username,
  //       password,
  //     }));

  //     const token = res.data.access_token;
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('role', role);
  //     setAuthToken(token);
  //     onLogin(role);  
  //   } catch (err) {
  //     if (err.response && err.response.status === 401) {
  //       setError('Invalid username or password');
  //     } else {
  //       setError('Something went wrong. Please try again.');
  //     }
  //   }
  // };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
//src/components/LoginForm.js

