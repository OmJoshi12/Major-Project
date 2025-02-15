const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Course routes' });
});

module.exports = router; 