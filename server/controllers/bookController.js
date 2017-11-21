const Book = require('../models/bookModel')

const createBook = (req, res) => {
    Book.create({
        title: req.body.title,
        harga: req.body.harga,
        author: req.body.author,
        stock: req.body.stock,
        category: req.body.category,
        image_url: req.body.image_url
    })
        .then(() => {
            res.status(200).send("Successfully inserted!")
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const getAllDataBook = (req, res) => {
    Book.find()
        .then((dataBooks) => {
            //console.log(dataBooks)
             res.status(200).send(dataBooks)
        })
        .catch((reason) => {
            //console.log(reason)
            res.status(500).send(reason)
        })
}


module.exports = {
    createBook,
    getAllDataBook
}