const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    text: {
        type: String,
        
    },
   answers: {
        type: Array,
    
    }
  
})


questionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

questionSchema.set('toJSON', {
    virtuals: true,
});

exports.Question = mongoose.model('Question', questionSchema);
exports.questionSchema = questionSchema;