const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        author: Number,
        title: {
            type: String,
            trim: true,
            required: [true, 'Title must be filled up']
        },
        content: String,
        status: String,
        commentable: String,
        comments: Array,
        type: {
            type: String,
            default: 'post'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', postSchema)