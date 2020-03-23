var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
  {
    genreCategory: {type: String, required: true, min: 2, max: 100}    
  }
);

//Virtual for author's full name
GenreSchema
    .virtual('name')
    .get(function () {

        //to avoid errors in cases where an author does not have either a family name or first name
        // We want to make sure we handle the exception by returning an empty string for that case
        var genreName = '';
        if (this.genreCategory) {
            genreName = this.genreCategory;
        }
        if (!this.genreCategory) {
            genreName = '-';
        }
        return genreName;
    });

// Virtual for book's URL 
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', GenreSchema);