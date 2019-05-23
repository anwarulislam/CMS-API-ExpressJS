const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Name must be filled up']
        },
        username: {
            type: String,
            trim: true
        },
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)