var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET menu listing. */
router.get('/', function(req, res, next) {
  var siteData = []
  // SQL Connection and Querys
  db.pool.getConnection().then(conn => {
    let sqlcmd = 'SELECT Orders.*, Menu.name, Menu.price FROM Orders INNER JOIN Menu ON Orders.menuID = Menu.ID'
      conn.query(sqlcmd).then(rows => {
        // Generate the siteData
        rows.forEach(element => {
          siteData.push({
            orderID: element.orderID,
            menuName: element.name,
            price: element.price,
            date: element.price,
            tableID: element.tableID,
            state: element.complete
          })
        })
        // Start loading page
        res.render('orders', { title: 'Orders', data: siteData });
      })
      conn.release()
    })
});

router.post('/', function(req, res, next) {
  var request = req.body
  console.log(request)
  var siteData = []
  // SQL Connection and Querys
  db.pool.getConnection().then(conn => {
    let sqlcmd = `UPDATE Orders SET complete = 1 WHERE Orders.orderID = ${request.id};`
    conn.query(sqlcmd).then(rows => {
      sqlcmd = 'SELECT Orders.*, Menu.name, Menu.price FROM Orders INNER JOIN Menu ON Orders.menuID = Menu.ID;'
      conn.query(sqlcmd).then(rows => {
        // Generate the siteData
        rows.forEach(element => {
          siteData.push({
            orderID: element.orderID,
            menuName: element.name,
            price: element.price,
            date: element.price,
            tableID: element.tableID,
            state: element.complete
          })
        })
        // Start loading page
        res.render('orders', { title: 'Orders', data: siteData });
      })})
      conn.release()
    })
});
module.exports = router;
