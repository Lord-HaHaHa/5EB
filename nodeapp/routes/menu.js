var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET menu listing. */
router.get('/', function(req, res, next) {
  
  var siteData = []
  // SQL Connection and Querys
  db.pool.getConnection().then(conn => {
    let sqlcmd = 'SELECT name, img, price, tag, id FROM Menu WHERE restaurantID = 1'
    conn.query(sqlcmd).then(rows => {
      // Generate the siteData
      rows.forEach(element => {
        console.log(element.name)
        var imgBuffer = new Buffer.from(element.img).toString("base64") // Conver BLOB to binary64
        element.tag.split(',')
        siteData.push({name: element.name, 
                       img: imgBuffer, 
                       price: element.price, 
                       tag: element.tag.split(','),
                       id: element.id})
      });

      // Start loading page
      res.render('menu', { title: 'Menu', data: siteData });
    })
    conn.release()
  })
});

module.exports = router;
