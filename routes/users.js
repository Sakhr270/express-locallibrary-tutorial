var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//added as an extra example
router.get('/cool/', function( req, res, next){
  res.send('you are cool');
});

module.exports = router;
