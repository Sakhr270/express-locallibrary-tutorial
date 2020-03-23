/**
 * An express application object named app, by convention.
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://Sakhr:freeze321!@cluster0-l1zui.mongodb.net/locallibrary?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/*
Those two will create two different routes, indexRoute and UserRoute
 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wikiRouter = require('./routes/wiki');
var catalogRouter = require('./routes/catalog'); //import routes for "catalog" area of site
var compression = require('compression');
var helmet = require ('helmet');

/*This will create the app object using the express module. 
* We'll then use it to set up the view (Template) engine.
*/
var app = express();


/* view engine setup (Two parts: 
    1) setting up the "views" value to specify the folder where the templates will be 
       stored - in this case in the subfolder /views)
    2) Then, we set the 'view engine' value to specify the template library (in this case pug)
*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// to add middleware libraries, we use app.use to call d/f functions.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wiki', wikiRouter);
app.use('/catalog', catalogRouter); //Add  catalog routes to middleware chain.
app.use(compression()); //Compress all routes
app.use(helmet()); //helmet will add subsets of the available headers. I can add/disable specific headers as needed

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Start here: to assign variables to the Schema "Author and Stories"
// var bob = new Author({ name: 'Bob Smith' });

// bob.save(function (err) {
//   if (err) return handleError(err);

//   //Bob now exists, so lets create a story
//   var story = new Story({
//     title: "Bob goes sledding",
//     author: bob._id    // assign the _id from the our author Bob. This ID is created by default!
//   });

//   story.save(function (err) {
//     if (err) return handleError(err);
//     // Bob now has his story
//   });
// });
//Schema ends here

//create an author model just by requiring the module
//var story = require ('./models/author')

//Use the auhtorModel object (Model)  to find all author records
//author.find(callback_function);

//this line is what allows it to be imported by /bin/www
module.exports = app;
