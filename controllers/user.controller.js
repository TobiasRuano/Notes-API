const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const sequelize = require('../models/index.js');
const fs = require('fs');
var path = require('path');

function signUp(req, res){
    models.User.findOne({where:{mail:req.body.mail}}).then(result => {
        if(result){
            res.status(406).json({
                message: "Email already exists!"
            });
        } else {
            if (result.password == null) {
                bcryptjs.genSalt(10, function(err, salt){
                    bcryptjs.hash(req.body.password, salt, function(err, hash){
                        const user = {
                            name: req.body.name,
                            surname: req.body.surname,
                            mail:req.body.mail,
                            password: hash
                        }
                        models.User.create(user).then(result => {
                            res.status(201).json({
                                message: "User created successfully",
                                data: result
                            });
                        }).catch(error => {
                            res.status(500).json({
                                message: "Something went wrong!",
                                error: error
                            });
                        });
                    });
                });
            } else {
                res.status(409).json({
                    message: "The user already has a password"
                });
            }
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

function login(req, res){
    models.User.findOne({where:{mail: req.body.mail}}).then(user => {
        if(user === null){
            res.status(404).json({
                message: "User not found",
            });
        } else {
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.mail,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token,
                            data: user
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credentials!"
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

function updateUser(req, res) {
    models.User.findOne({where:{id:req.body.id}}).then(result => {
        if(result === null) {
            res.status(404).json({
                message: "User not found",
            });
        } else {
            models.User.findOne({where:{mail:req.body.mail}}).then(result2 => {
                if(result2) {
                    res.status(403).json({
                        message: "Another user already uses that email.",
                    });
                } else {
                    const user = {
                        mail:req.body.mail,
                        address: req.body.address
                    }
                    models.User.update(user, {where: {id: result.id}}).then(result => {
                        res.status(201).json({
                            message: "User updated succesfully"
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong!",
                        });
                    });
                }
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong!",
                });
            });
        }
    });
}

function getCurrentDateTime() {
    var localTime = moment().format('YYYY-MM-DD HH:mm:ss');
    return localTime;
}


module.exports = {
    signUp: signUp,
    login: login,
    updateUser: updateUser
} 