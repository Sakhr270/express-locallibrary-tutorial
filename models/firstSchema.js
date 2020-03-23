// var mongoose = require('mongoose');

// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB, { useNewUrlParser: true});

// //Get the default connection
// var db = mongoose.connection;
// /*if I need to create additional connections
// *mongoose.createConnection()
// */

// //Bind connection to error event (to get notification of connection error)
// db.on ('error' , console.error.bind(console, 'MongoDB connection error: '));

// //Define a Schema
// var Schema = mongoose.Schema;

// //We will have only a string and a date in our Schema
// var SomeModelSchema = new Schema ({
//     a_string: String,
//     a_data: Date
// });

// //Compile model for schema
// var SomeMode = mongoose.model('SomeModel', SomeModelSchema);
// //the first argument is the singular name of the collection that'll be created for my model
// //and the second argument is the schema I want to use in creating the model.

// module.exports = mongoose.model('firstSchema', {
//     number: Number,
//     origin: String, 
//     destination: String,
//     departs: String,
//     arrives: String, 
//     actualDepart: Number,
//     actualArrive: Number
// });