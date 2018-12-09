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

router.get('/recipe/:recipe', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'recipe.html'));
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

router.get('/filterword/:word', function(req,res) {
  
  var query = 'SELECT * FROM Recipe WHERE title LIKE \'%' + req.params.word + '%\' LIMIT 0' + "," + 15;
  
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err)
      
    }
    else {
      res.json(rows);
    }  
  });
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