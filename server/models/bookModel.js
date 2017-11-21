const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    harga: Number,
    stock: Number,
    category: String,
    image_url: String
})



const Book = mongoose.model('books', bookSchema)

module.exports = Book