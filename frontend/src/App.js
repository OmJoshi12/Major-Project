import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AttendanceMarking from './components/AttendanceMarking';
import SmartAttendance from './components/SmartAttendance';
import AttendancePage from './components/AttendancePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/attendance" element={<AttendanceMarking />} />
        <Route path="/smart-attendance" element={<SmartAttendance />} />
        <Route path="/attendance-page" element={<AttendancePage />} />
      </Routes>
    </Router>
  );
}

export default App; 