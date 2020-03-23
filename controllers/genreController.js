var Book = require('../models/book');
var async = require('async');
var Genre = require('../models/genre');
const validator = require('express-validator');

// Display list of all Genre.
exports.genre_list = function(req, res) {
        //return all Author objects sorted by family_name in alphabetic order
    Genre.find()
    .sort([['genreCategory', 'ascending']])
    //the callback passed the exec() method is called with any errors as the first parameter,
    //or a list of all authors on success
    .exec(function (err, list_genres) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
    });
    
    };
// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {

    //this method is to query the genre name and its associated books in parallel,
    //with the callback rendering the page when (if) both requests complete successfully.
    async.parallel({
        genre: function(callback) {
            //The ID of the required genre record is encoded at the end of the URL
            //and extracted automatically based on the route defintion(/genre/:id).
            //The ID is accessed within the controller via the request parameters: req.params.id.
            //It is used in Genre.findByID() to get the current genre
            Genre.findById(req.params.id)
              .exec(callback);
        },
        //Like the comment above, it is used to get all Books objects that have the genre ID
        //and in their genre filed: Book.find( {'genre': req.params.id })
        genre_books: function(callback) {
            Book.find({ 'genre': req.params.id })
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        //if the genre does not exist in the database, then findById() will return successfully with no results
        //In this case we want to display a "not found" page, so we create an Error object and pass it to the next
        //middleware function in the chain
        if (results.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        //the rendered view is genre_detail and it is passed variables for the title, genre and
        //the list of books in this genre (genre_books)
        res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
    });

};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
    // res.send('NOT IMPLEMENTED: Genre create GET');
    res.render('genre_form', { title: 'Create Genre '});
};

// Handle Genre create on POST.
// exports.genre_create_post = function(req, res) {
         // res.send('NOT IMPLEMENTED: Genre create POST');

// };
// Handle Genre create on POST.
//First NOTE: instead of the arguments (req, res, next) being a single middleware
//the controller specifies an array of middleware functions. The arry is passed to the
//router function and each method is called in order. 
//This approach is needed because we need the validator and sanitiser middleware functions.
exports.genre_create_post =  [
   
    // Validate that the name field is not empty. 
    /**Defines a validator to check the name field is not empty (calling trim() to remove any 
    *trailing/leading whitespace before performing the validation).*/
    validator.body('name', 'Genre name required').trim().isLength({ min: 1 }),
    
    // Sanitize (escape) the name field.
    /**This method creates a sanitizer to escape() any dangerous HTML characters in the name field.*/
    validator.sanitizeBody('name').escape(),
  

    // Process request after validation and sanitization.
    /**Now, we create a middleware function to extract any validation errors.
     * We use isEMpty() to check whether there are any errors in the validation result.
     * If there are any then we render the form again, passing in our sanitised genre object and
     * the array of error messages (errors.array())*/
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validator.validationResult(req);
  
      // Create a genre object with escaped and trimmed data.
      var genre = new Genre(
        { name: req.body.name}
      );
  
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
        return;
      }
      /**If the genre name data is valid then we check if a Genre with the same name
       * alreay exists (as we don't want to create duplicates). 
       * If it does, we redirect to the existing genre's detail page. 
       * If not, we save the new Genre and redirect to its detail page.
       */
      
      else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        Genre.findOne({ 'name': req.body.name })
          .exec( function(err, found_genre) {
             if (err) { return next(err); }
  
             if (found_genre) {
               // Genre exists, redirect to its detail page.
               res.redirect(found_genre.url);
             }
             else {
  
               genre.save(function (err) {
                 if (err) { return next(err); }
                 // Genre saved. Redirect to genre detail page.
                 res.redirect(genre.url);
               });
             }
           });
      }
    }
  ];


// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};