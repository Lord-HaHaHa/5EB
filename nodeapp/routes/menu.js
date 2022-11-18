var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET menu listing. */
router.get('/menu', function(req, res, next) {
  db.pool.getConnection().then(conn =>{
    console.log(conn)
  })
  res.render('menu', { title: 'Menu' });
});

module.exports = router;
