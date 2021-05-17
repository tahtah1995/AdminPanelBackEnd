const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    price: { 
        type: String,
        default:0
    } ,

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
      
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },


    
    
})


courseSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});

exports.Course = mongoose.model('Course', courseSchema);
