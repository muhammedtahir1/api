const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Enter your name']
        },
        nickname:{
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User;