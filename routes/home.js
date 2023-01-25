const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Yify');
});

module.exports.router = router;