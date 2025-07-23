import React, {useState} from "react";
import API, { setAuthToken } from '../api';

const CheckInOut =() =>{
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [error, setError] = useState('');
    //const [message, setMessage] = useState('');
    
    const handleCheckIn = async () => {
        setError('');
        try {
        const res = await API.post('/attendance/check-in');
        //setMessage(res.data.message || 'Checked in successfully');
        setCheckInTime(res.data.check_in_time);
        } catch (err) {
        setError('Check-in failed');
        //setMessage('');
        }
    };
    
    const handleCheckOut = async () => {
        setError('');
        try {
        const res = await API.post('/attendance/check-out');
        //setMessage(res.data.message || 'Checked out successfully');
        setCheckOutTime(res.data.check_out_time);
        } catch (err) {
        setError('Check-out failed');
        //setMessage('');
        }
    };
    
    return (
        <div className="checkinout-container">
        <h2>Check In/Out</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
            <button onClick={handleCheckIn}>Check In</button>
            {checkInTime && <p>Checked in at: {checkInTime}</p>}
        </div>
        <div>
            <button onClick={handleCheckOut}>Check Out</button>
            {checkOutTime && <p>Checked out at: {checkOutTime}</p>}
        </div>
        </div>
    );
};

export default CheckInOut;