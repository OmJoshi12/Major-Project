import React, { useState } from 'react';
import axios from 'axios';
import './AttendancePage.css';

const AttendancePage = () => {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [message, setMessage] = useState('');

  const handleAttendanceMarking = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/attendance/mark', {
        studentId: enrollmentNumber,
        studentName: studentName,
        date: new Date(),
      });

      if (response.data.message) {
        setMessage('Attendance marked successfully!');
      }
    } catch (error) {
      setMessage('Error marking attendance: ' + error.message);
    }
  };

  return (
    <div className="attendance-page">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleAttendanceMarking} className="attendance-form">
        <div className="form-group">
          <label htmlFor="enrollmentNumber">Enrollment Number</label>
          <input
            type="text"
            id="enrollmentNumber"
            value={enrollmentNumber}
            onChange={(e) => setEnrollmentNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="mark-attendance-btn">Mark Attendance</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AttendancePage; 