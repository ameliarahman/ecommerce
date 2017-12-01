const User = require('../models/userModel')
const Encrypt = require('../helpers/encrypt')
const Decrypt = require('../helpers/decrypt')
const jwt = require('jsonwebtoken')

const getAllDataUser = (req, res) => {
    User.find()
        .then((dataUsers) => {
            res.status(200).send(dataUsers)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const deleteUser = (req, res) => {
    User.remove({
        _id: req.params.id
    })
        .then((dataUser) => {
            res.status(200).send({
                message: "Successfully deleted!",
                data: dataUser
            })
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

const signInUser = (req, res) => {
    User.findOne({
        username: req.body.username
    }).then((dataUser) => {
        if (!dataUser) {
            res.status(401).json({
                message: "Authentication failed. User not found"
            })
        } else {
            Decrypt(req.body.password, dataUser.password).then((hasil) => {
                if (!hasil) {
                    res.status(401).json({
                        message: "Authentication failed. Password is incorrect"
                    })
                } else {
                    const payload = {
                        isAdmin: dataUser.isAdmin,
                        _id: dataUser._id,
                        username: dataUser.username,
                        isLogin: true
                    }
                    jwt.sign(payload, process.env.secret, function (err, token) {
                        if (err) {
                            throw err
                        } else {
                            res.send({
                                message: "Login berhasil",
                                token: token,
                                data: payload
                            })
                        }
                    })
                }
            })
        }
    })
}
module.exports = {
    getAllDataUser,
    createUser,
    deleteUser,
    signInUser
}