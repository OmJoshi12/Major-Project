const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'Faculty routes' });
});

module.exports = router; 