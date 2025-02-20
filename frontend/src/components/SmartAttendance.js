import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SmartAttendance.css';

const SmartAttendance = () => {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [message, setMessage] = useState('');
  const [presentStudents, setPresentStudents] = useState([]);
  const videoRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCapturing(true);
    } catch (err) {
      setMessage('Error accessing camera: ' + err.message);
    }
  };

  const captureImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    
    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob);
      formData.append('student_id', enrollmentNumber); // Use enrollment number
      formData.append('studentName', studentName); // Append student name

      try {
        const response = await axios.post('http://localhost:5001/api/face/verify', formData);
        if (response.data.match) {
          // Mark attendance in main backend
          await axios.post('http://localhost:5000/api/attendance/mark', {
            studentId: enrollmentNumber,
            studentName: studentName,
            date: new Date(),
            image: blob // Send the image blob
          });
          setMessage('Attendance marked successfully!');
          fetchPresentStudents(); // Fetch present students after marking attendance
        } else {
          setMessage('Face verification failed. Please try again.');
        }
      } catch (err) {
        setMessage('Error marking attendance: ' + err.message);
      }
    }, 'image/jpeg');
  };

  const handleAttendanceMarking = async (e) => {
    e.preventDefault();
    setMessage('');
    captureImage();
  };

  const fetchPresentStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance/present');
      if (Array.isArray(response.data)) {
        setPresentStudents(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setPresentStudents([]); // Reset to empty array if not an array
      }
    } catch (error) {
      console.error('Error fetching present students:', error);
    }
  };

  useEffect(() => {
    fetchPresentStudents(); // Fetch present students on component mount
  }, []);

  return (
    <div className="smart-attendance">
      <h2>Smart Attendance</h2>
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
        <div className="camera-container">
          <video
            ref={videoRef}
            autoPlay
            style={{ display: isCapturing ? 'block' : 'none' }}
          />
        </div>
        <div className="controls">
          {!isCapturing ? (
            <button type="button" onClick={startCamera} className="start-camera-btn">Start Camera</button>
          ) : (
            <button type="submit" className="mark-attendance-btn">Mark Attendance</button>
          )}
        </div>
      </form>
      {message && <p className="message">{message}</p>}
      <h3>Present Students</h3>
      <ul className="present-students-list">
        {presentStudents.map((student, index) => (
          <li key={index}>
            {student.studentName} (ID: {student.studentId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartAttendance; 