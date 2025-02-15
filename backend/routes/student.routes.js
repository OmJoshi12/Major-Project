const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Student routes' });
});

module.exports = router; 