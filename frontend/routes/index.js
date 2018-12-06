var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'nutritionandrecipes.ce7wp32dwfvn.us-east-2.rds.amazonaws.com',
    user     : 'cis550group',
    password : 'password',
    database: "nutrition_and_recipes",
    port : '3306'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = 'SELECT * FROM Recipe WHERE rating >= 5';
  
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }  
  });
  // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

// router.get('/reference', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
// });

// router.get('/insert', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
// });

// router.get('/friends', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'friends.html'));
// });

// router.get('/family', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'family.html'));
// });

// router.get('/family/:login', function(req, res, next) {
//   var query = 'SELECT * FROM Person WHERE login IN (SELECT F.member FROM Family F WHERE F.login = \'' + req.params.login + '\')';
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       console.log(rows)
//       res.json(rows);
//     }  
//   })
// });

// router.get('/familyLogins', function(req, res, next) {
//   var query = 'SELECT DISTINCT login FROM Family';
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.json(rows);
//     }  
//   })
// });

// router.get('/data/:email', function(req,res) {
//   var query = req.params.email === 'undefined' || req.params.email === '' ? 
//   'SELECT * FROM Person' : 'SELECT * FROM Person P WHERE P.login = \'' + req.params.email + '\'';
  
//   connection.query(query, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.json(rows);
//     }  
//   });
// });

// router.get('/friends/:email', function(req,res) {
//   if (req.params.email) {
//     var query ='SELECT * FROM Person P WHERE P.login IN (SELECT F.friend FROM Friends F WHERE F.login = \'' 
//     + req.params.email + '\' OR (F.login IN (SELECT Fam.member FROM Family Fam WHERE Fam.login = \''
//      + req.params.email + '\'))) AND P.login <> \'' + req.params.email + '\''; 

//      connection.query(query, function(err, rows, fields) {
//         if (err) console.log(err);
//         else {
//           res.json(rows);
//         }  
//       });
//   } 
// });

// router.post('/insertNew/:login/:name/:sex/:relation/:birth', function(req,res) {
//   var insert = 'INSERT INTO Person VALUES(\'' + req.params.login + '\',\'' + req.params.name + '\',\''
//    + req.params.sex + '\',\'' + req.params.relation + '\',' + req.params.birth +')';
//   connection.query(insert, function(err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.send({redirectURL: '/'})
//     }
//   });
// });

module.exports = router;