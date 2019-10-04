var fs = require('fs');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var config = require('../config');
var User = require('../model/user');
var Transaction = require('../model/transaction');
var jwt_decode = require('jwt-decode');
var path = require('path');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.post('/register', (req, res, next) => {
    console.log(req);
    let checkEmail = { "email": req.body.email }
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.contact,
    })
    User.getUserByEmail(checkEmail, (err, user) => {
        if (err) { throw err }
        else if (user) {
            res.json({
                success: false
            });
        }
        else {
            User.addUser(newUser, (err, user) => {

                if (err) { res.send({ success: false }) }
                else {
                    res.send({ success: true });
                }
            })

        }
    })
})

router.post('/login', (req, res, next) => {

    let authenicate = {
        email: req.body.email,
        password: req.body.password
    }
    User.getUserByEmail(authenicate, (err, user) => {

        if (err) { throw err }
        if (!user) { res.json({ success: false }); }
        else {
            var users = { user };
            const token = jwt.sign(users, config.secret,
                {
                    expiresIn: 6048000 // 1 week
                });
            res.json({
                success: true,
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    contact: user.contact,
                    propic: user.propic
                }
            });
        }
    })
})


router.post('/uploadTransaction', verifyToken, (req, res, next) => {

    var decoded = jwt_decode(req.token);

    let transaction = new Transaction({
        transactionid: req.body.transactionid,
        amount: req.body.amount,
        description: req.body.description,
        transferto: req.body.transferto,
        date:req.body.date
    })

    Transaction.addTransaction(transaction, (err, user) => {
        if (err) throw err;
        else {
            res.json({
                success: true,
            });
        }
    });
});

function verifyToken(req, res, next) {

    const bearHeader = req.headers['authorization'];
    if (typeof bearHeader !== "undefined") {

        const bearer = bearHeader.split(' ');
        const bearToken = bearer[1];
        console.log(req.token);
        req.token = bearToken;
        next();
    }
    else {
        console.log(req.body);
        res.sendStatus(403);
    }

}

module.exports = router;