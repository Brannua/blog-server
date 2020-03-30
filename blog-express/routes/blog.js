var express = require('express'),
  router = express.Router();

router.get('/list', (req, res, next) => {
  res.json({
    errno: 0,
    data: [1, 2, 3]
  });
});

module.exports = router;
