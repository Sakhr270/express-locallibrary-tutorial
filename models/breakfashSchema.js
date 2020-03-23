/**
 * An example: shows how I can specify some of the validators types and error messages
 */

var breakfastSchema = new Schema({
    eggs:  {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12,
        required: [true, 'Why no eggs?']
    },
    drink: {
        type: String,
        enum: ['Coffee', 'Tee', 'Water']
    }
});