var express = require('express');
var router = express.Router();

// var FirstSchemaImport = require('../schemas/firstSchema');

// module.exports = function (firstSchemas) {
//   var firstSchema = require('../firstSchema');

//   for (var number in firstSchemas) {
//     FirstSchemas[number] = firstSchema(firstSchemas[number]);
//   }

//   var functions = {};

//   functions.firstSchema = function(req, res){
//     var number = req.param('number');

//     if (typeof firstSchemas[number] === 'undefined'){
//       res.status(404).json({status: 'error'});
//     } else {
//       res.json(firstSchemas[number].getInformation());
//     }
//   };

//   functions.arrived = function (req, res) {
//     var number = req.param('number');

//     if (typeof firstSchemas[number] === 'undefined' ) {
//       res.status(404).json({status: 'error'});
//     } else {
//       firstSchemas[number].triggerArrive();

//       var record = new FirstSchemaImport(firstSchemas[number].getInformation()
//       );
//       record.save(function(err) {
//         if (err) {
//           console.log(err);
//           res.status(500).json({status: 'failure'}
//         } else {
//           res.json({status: 'success'});
//         }
//       });
//       res.json({status: 'done'});
//     }
//   };

//   functions.list = function (req, res){
//     res.render('list', {
//       title: 'All flights',
//       flights: flights});
//     };

/* GET home page. 
*  next: if I want to add multiple route handlers to the '/' route path
*/
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//Get Home page
// GET home page.
router.get('/', function(req, res) {
  //redirect -> This redirects to the specified page, by default sendign HTTP
  //status code "302 Found". I can change the status code returned if I need, 
  //and supply either absolute or relative paths
  res.redirect('/catalog');
});

module.exports = router;


/* 
The method Response.render is used to render a specififed template along with
the values of named variables passed in an object, and then send the result
as a response. 
In the function above, it uses the Template called 'index' */