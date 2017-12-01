const Transaction = require('../models/transactionModel')

const createTransaction = (req, res) => {
    Transaction.create({
        customer: req.body.customer,
        date: new Date(),
        items: req.body.book,
        total: req.body.total
    })
        .then((dataTransaction) => {
            res.status(200).send(dataTransaction)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const getTransaction = (req, res) => {
    Transaction.find({
        customer: req.params.id
    })
        .populate('items')
        .populate('customer')
        .then((dataTransactions) => {
            res.status(200).send(dataTransactions)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}
module.exports = {
    createTransaction,
    getTransaction
}