const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema( {
    user_name: {
        type:String,
        required:true
    },
    game_name: {
        type:String,
        required:true
    },
    review: {
        type:String,
        required:true
    }
})

const Review = new mongoose.model('Review', reviewSchema)

module.exports = Review