import React, { useState, useRef } from 'react';
import axios from 'axios';

const AttendanceMarking = () => {
  const [message, setMessage] = useState('');
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
      formData.append('student_id', localStorage.getItem('userId'));

      try {
        const response = await axios.post('http://localhost:5001/api/face/verify', formData);
        if (response.data.match) {
          // Mark attendance in main backend
          await axios.post('http://localhost:5000/api/attendance/mark', {
            studentId: localStorage.getItem('userId'),
            courseId: 'CURRENT_COURSE_ID', // You'll need to pass this dynamically
            date: new Date()
          });
          setMessage('Attendance marked successfully!');
        } else {
          setMessage('Face verification failed. Please try again.');
        }
      } catch (err) {
        setMessage('Error marking attendance: ' + err.message);
      }
    }, 'image/jpeg');
  };

  return (
    <div className="attendance-marking">
      <h2>Mark Attendance</h2>
      <div className="camera-container">
        <video
          ref={videoRef}
          autoPlay
          style={{ display: isCapturing ? 'block' : 'none' }}
        />
      </div>
      <div className="controls">
        {!isCapturing ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <button onClick={captureImage}>Mark Attendance</button>
        )}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AttendanceMarking; 