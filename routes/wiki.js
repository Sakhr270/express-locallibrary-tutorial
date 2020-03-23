// wiki.js - Wiki route module.

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res, next) {
  //res.send('Wiki home page');
  res.render('wiki', { title: 'About this wiki' });
});

// About page route.
//this method responds only to HTTP GET Requests
router.get('/about/', function (req, res , next) {
  res.send('About this wiki');
});

//acts like the mehtod above..not exactly because it doesn't work
// it behaves the same, BUT only responds to HTTP POST requests.
router.post('/about/', function (req, res){
  res.send('About this wiki and show new things');
})
  
//Route parameters
// app.get('/users/:userId/books/:bookId', function (req, res) {
//   //Access userId via: req.params.userId
//   //Access bookId via: req.params.bookId
//   res.send(req.params);
// })

module.exports = router;