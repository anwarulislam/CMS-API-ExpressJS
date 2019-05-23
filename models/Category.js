const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Category name must be filled up']
    },
    color: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)