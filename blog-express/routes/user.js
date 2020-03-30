var express = require('express'),
  router = express.Router();

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  res.json({
    errno: 0,
    data: { username, password },
  });
});

module.exports = router;
