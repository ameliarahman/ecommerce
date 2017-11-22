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

const createUser = (req, res) => {
    User.create({
        name: req.body.name,
        password: req.body.password,
        username: req.body.username,
        isAdmin: req.body.isAdmin
    })
        .then((dataUser) => {
            res.status(200).send({
                message: "Data successfully inserted",
                data: dataUser
            })
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

module.exports = {
    getAllDataUser,
    createUser
}