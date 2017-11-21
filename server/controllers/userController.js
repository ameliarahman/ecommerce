const User = require('../models/userModel')

const getAllDataUser = (req, res) => {
    User.find()
        .then((dataUsers) => {
            res.status(200).send(dataUsers)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

module.exports = {
    getAllDataUser
}