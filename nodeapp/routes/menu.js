var express = require('express');
var router = express.Router();
var db = require('../database');

Array.prototype.unique = function() {
  var a = this.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
};

/* GET menu listing. */
router.get('/', function(req, res, next) {
  var tags = []
  var siteData = []
  // SQL Connection and Querys
  db.pool.getConnection().then(conn => {
    let sqlcmd = 'SELECT name, img, price, tag, id FROM Menu WHERE restaurantID = 1'
    conn.query(sqlcmd).then(rows => {
      // Generate the siteData
      rows.forEach(element => {
        console.log(element.name)
        var imgBuffer = new Buffer.from(element.img).toString("base64") // Conver BLOB to binary6
        tags = tags.concat(element.tag.split(',')).unique()
        siteData.push({name: element.name, 
                       img: imgBuffer, 
                       price: element.price, 
                       tag: element.tag.split(','),
                       id: element.id})
      });
      // Start loading page
      res.render('menu', { title: 'Menu', tableData: siteData, tableID: 1, tags: tags});
    })
    conn.release()
  })
});

module.exports = router;
