var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.post('/*', function(req, res, next) {
  request = req.body
  var tableID = request.tableID
  console.log(request)
  db.pool.getConnection().then(conn => {
    request.id.forEach((element, index) => {
      if(request.Anzahl[index] > 0){
        console.log(`${element} | ${request.Anzahl[index]}`)
        var amount = request.Anzahl[index]
        //Insert to Order DB
        try{
          conn.query(`INSERT INTO Orders (menuID, tableID, amount) values (${element}, ${tableID}, ${amount});`)
        }catch{
          console.log("Fehler beim Einfügen in die DB")
        }
      }
    });
    conn.release()
  })
  
  res.render('thxfororder');
});

module.exports = router;
