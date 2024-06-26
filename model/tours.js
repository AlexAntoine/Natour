const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true, 'A tour must have a name'],
        unique:true
    },
    rating:{
        type: Number,
        default: 4.5,
    },
    
    price:{
        type:Number,
        required:[true, 'A price is required for a tour']
    }
});

const Tour = mongoose.model('tours',tourSchema);

module.exports = Tour;