// src/components/CheckInOut.js
import React, { useState } from 'react';
import API from '../api';

const CheckInOut = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckIn = async () => {
    try {
      const res = await API.post('/attendance/check-in');
      setCheckInTime(res.data.check_in);
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await API.post('/attendance/check-out');
      setCheckOutTime(res.data.check_out);
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Check-out failed');
    }
  };

  return (
    <div className="checkin-container">
      <h3>Check-In/Out</h3>
      <button onClick={handleCheckIn}>Check In</button>
      {checkInTime && <p>Checked in at: {new Date(checkInTime).toLocaleTimeString()}</p>}

      <button onClick={handleCheckOut} style={{ marginTop: '10px' }}>Check Out</button>
      {checkOutTime && <p>Checked out at: {new Date(checkOutTime).toLocaleTimeString()}</p>}

      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default CheckInOut;
