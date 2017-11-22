const User = require('../models/userModel')
const Encrypt = require('../helpers/encrypt')

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
    Encrypt(req.body.password).then((newPassword) => {
        console.log(newPassword)
        User.create({
            name: req.body.name,
            password: newPassword,
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
    })

}

module.exports = {
    getAllDataUser,
    createUser
}