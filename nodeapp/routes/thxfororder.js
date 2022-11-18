var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/*', function(req, res, next) {
  var result = JSON.stringify(req.body)
  result = JSON.parse(result)
  Object.keys(result).forEach((element) => {
    console.log(element)
  });
  console.log(result)
  res.render('thxfororder');
});

module.exports = router;
