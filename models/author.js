var mongoose = require('mongoose');

var Schema = mongoose.Schema;
    
var AuthorSchema = new Schema(
    {
      first_name: {type: String, required: true, max: 100},
      family_name: {type: String, required: true, max: 100},
      date_of_birth: {type: Date},
      date_of_death: {type: Date},
    }
  );

var moment = require('moment');
//Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        //to avoid errors in cases where an author does not have either a family name or first name
        // We want to make sure we handle the exception by returning an empty string for that case
       
        var fullname = '';
        if (this.first_name && this.family_name) {
          fullname = this.family_name + ', ' + this.first_name
        }
        if (!this.first_name || !this.family_name) {
          fullname = '';
        }
      
        return fullname;
      });

    // Virtual for author's URL to get a particular instance of the model

AuthorSchema
    .virtual('lifespan')
    .get(function () {
    //return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
      
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD, h:mm:ss a') : ' ';
    });

AuthorSchema
    .virtual('death')
    .get(function () {
      // return death time

      return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD, h:mm:ss a') : ' ';
    })
/**
 *we'll use the property in our templates whenever we need to get a link to 
 a particular author
 */
AuthorSchema
    .virtual('url')
    .get(function () {
    return '/catalog/author/' + this._id;
});

//virtual property due_back_formatted
AuthorSchema
.virtual('due_back_formatted')
.get(function () {
  return moment(this.due_back).format('MMMM Do, YYYY');
});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);









//     var storySchema = Schema ({
//         title: String, 
//         author: [{type: Schema.Types.ObjectId, ref: 'Author' }]
//     });

//     var Story = mongoose.model('Story', storySchema);
//     var Author = mongoose.model('Author', AuthorSchema);

// module.exports = mongoose.model('story', storySchema);
// module.exports = mongoose.model('author', AuthorSchema);














// var Schema = mongoose.Schema;

// var schema = new Schema(
// {
//   name: String,
//   binary: Buffer,
//   living: Boolean,
//   updated: { type: Date, default: Date.now() },
//   age: { type: Number, min: 18, max: 65, required: true },
//   mixed: Schema.Types.Mixed,
//   _someId: Schema.Types.ObjectId,
//   array: [],
//   ofString: [String], // You can also have an array of each of the other types too.
//   nested: { stuff: { type: String, lowercase: true, trim: true } }
// })