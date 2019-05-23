const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name must be filled up']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Tag', tagSchema)