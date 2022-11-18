var express = require('express');
var router = express.Router();

/* GET menu listing. */
router.get('/', function(req, res, next) {
  res.render('overviewOwner', { title: 'Menu' });
});

module.exports = router;
