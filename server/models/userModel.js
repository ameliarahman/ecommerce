const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password: String,
    username: {
        type: String,
        unique: true
    },
    isAdmin: Boolean
})

const User = mongoose.model('users', userSchema)

module.exports = User