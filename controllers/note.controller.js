const models = require('../models');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const sequelize = require('../models/index.js');
const fs = require('fs');
var path = require('path');

function createNote(req, res){
    const note = {
        title: req.body.title,
        content: req.body.content,
        userID:req.userData
    }
    models.Note.create(note).then(result => {
        res.status(201).json({
            message: "Note created successfully",
            Note: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

module.exports = {
    createNote: createNote
} 