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
        userId:req.userData.userId
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

function getNotes(req, res) {
    console.log(req.userData.userId)
    models.Note.findAll({where:{userId:req.userData.userId}}).then(result => {
        if(result) {
            res.status(201).json({
                data: result
            });
        } else {
            res.status(404).json({
                message: "No notes for user: " + req.userData.userId
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

function updateNote(req, res) {
    models.Note.findOne({where:{id:req.body.id}}).then(result => {
        if(result) {
            const note = {
                title: req.body.title,
                content: req.body.content
            }
            models.Note.update(note, {where: {id: result.id}}).then(result2 => {
                res.status(200).json({
                    data: result2
                });
            }).catch(error => {
                res.status(304).json({
                    message: "Unable to update Note",
                    error: error
                });
            });
        } else {
            res.status(404).json({
                message: "Note not found."
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

function deleteNote(req, res) {
    models.Note.findOne({where:{id:req.body.id}}).then(result => {
        if(result) {
            models.Note.destroy({where: {id: result.id}}).then(result2 => {
                res.status(200).json({
                    message: "Note deleted!"
                });
            }).catch(error => {
                res.status(400).json({
                    message: "Unable to delete Note.",
                    error: error
                });
            });
        } else {
            res.status(404).json({
                message: "Note not found."
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

module.exports = {
    createNote: createNote,
    getNotes: getNotes,
    deleteNote: deleteNote,
    updateNote: updateNote
} 