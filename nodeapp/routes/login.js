var express = require('express');
var router = express.Router();
const session = require('express-session');
var db = require('../database');

/* GET menu listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'LogIn to Scan\'n\'Eat' });
});

router.post('/', function(req, res, next) {
  var postreq = req.body
  console.log("postfunction")
  db.pool.getConnection().then(conn => {
    let sqlcmd = `SELECT * FROM User WHERE password = SHA2('${postreq.password}',0) AND username = '${postreq.username}'; `
    conn.query(sqlcmd).then(rows => {
      if(rows.length == 1){
        req.session.loggdin = true
        req.session.restaurantID = rows[0].restaurantID
        console.log(req.session)
        res.redirect('orders')
      }
      else{
        res.render('login', { title: 'LogIn to Scan\'n\'Eat' });
      }
    })
    conn.release()
  })
  
  
});
module.exports = router;
