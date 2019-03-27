const mongoose = require('mongoose')
const Schema = mongoose.Schema

const portfolioItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    imgTitle: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    link: {
        type: String
    },
    isFeatured: {
        type: Boolean,
        required: true
    }
})


module.exports = mongoose.model("Portfolio", portfolioItemSchema)

