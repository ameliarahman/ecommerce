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

const updateDataBook = (req, res) => {
    Book.findById(req.params.id)
        .then((dataBook) => {
            dataBook.title = req.body.title
            dataBook.category = req.body.category
            dataBook.harga = req.body.harga
            dataBook.author = req.body.author
            dataBook.stock = req.body.stock
            dataBook.image_url = req.body.image_url

            dataBook.save()
                .then((data) => {
                    res.send({
                        data: data,
                        message: "1 Book successfully updated!"
                    })
                })
                .catch((reason) => {
                    res.status(500).send(reason)
                })
        })
}

const deleteBook = (req, res) => {
    Book.remove({
        _id: req.params.id
    })
        .then(() => {
            res.send("1 Book successfully deleted!")
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}
module.exports = {
    createBook,
    getAllDataBook,
    updateDataBook,
    deleteBook
}