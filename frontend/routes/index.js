var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'nutritionandrecipes.ce7wp32dwfvn.us-east-2.rds.amazonaws.com',
    user     : 'cis550group',
    password : 'password',
    database: "cis550group",
    port : '3306'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/recipe/:rid', function(req, res, next) {
  // res.send({one: req.params.rid})
  res.sendFile(path.join(__dirname, '../', 'views', 'recipe.html'));
});

router.get('/recipe/info/:rid', function(req, res, next) {
  var query = 'SELECT * FROM Recipe WHERE rid =' + req.params.rid;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }  
  });
});

router.get('/recipe/ingredients/:rid', function(req, res, next) {
  var query = 'SELECT * FROM Ingredient NATURAL JOIN Nutrient NATURAL JOIN Has WHERE rid =' + req.params.rid;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }  
  });
});

router.get('/fillhome/:start', function(req, res, next) {
  var start = req.params.start
  var query = 'SELECT * FROM Recipe LIMIT ' + start + "," + 15;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }  
  });
})

router.get('/filterword/:word/:index', function(req,res) {
  
  var query = 'SELECT * FROM Recipe WHERE title LIKE \'%' + req.params.word + '%\' LIMIT ' + req.params.index + "," + 15;
  
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(rows);
    }  
  });
});

router.get('/rating/:index', function(req,res) {
  
  var query = 'SELECT * FROM Recipe ORDER BY rating DESC LIMIT ' + req.params.index + "," + 15;
  
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(rows);
    }  
  });
});

router.get('/filteringredient/:word/:index', function(req,res) {
  
  var query = 'SELECT DISTINCT title, rating, description FROM Recipe NATURAL JOIN Ingredient WHERE ingredient LIKE \'%' + req.params.word + '%\' LIMIT ' + req.params.index + "," + 15;
  
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(rows);
    }  
  });
});

// router.get('/rareingredient/:word/:index', function(req,res) {
  
//   var query = 'SELECT DISTINCT title, rating, description FROM HAS U1 NATURAL JOIN (SELECT iid FROM Has U2)'
//   Ingredient WHERE ingredient LIKE \'%' + req.params.word + '%\' LIMIT ' + req.params.index + "," + 15;
  
//   connection.query(query, function(err, rows, fields) {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       res.json(rows);
//     }  
//   });
// });



module.exports = router;