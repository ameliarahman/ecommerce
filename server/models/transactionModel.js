const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const transactionSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'books',
            amount: {
                type: Number,
                default: 1
            }
        },

    ],
    total: Number,
    date: Date
})

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction