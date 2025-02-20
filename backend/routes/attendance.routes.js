const router = require('express').Router();
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.studentId}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Mock database for attendance records
let attendanceRecords = [];

// Mark attendance route
router.post('/mark', upload.single('image'), (req, res) => {
  try {
    const { studentId, studentName, date } = req.body;
    const imagePath = req.file.path; // Get the path of the uploaded image

    // Here you would typically save to a database
    attendanceRecords.push({ studentId, studentName, date, imagePath });
    
    res.json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// New route to get present students
router.get('/present', (req, res) => {
  try {
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:studentId', (req, res) => {
  try {
    const { studentId } = req.params;
    // TODO: Implement attendance retrieval logic
    res.json({ message: 'Attendance records retrieved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 