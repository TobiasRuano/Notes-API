var NoteService = require('../services/note.service');

// Saving the context of this module inside the _the variable
_this = this;

exports.createNote = async function (req, res, next) {
    var Note = {
        title: req.body.title,
        body: req.body.body,
        date: req.body.date
    }
    try {
        var createdNote = await NoteService.createNote(Note)
        return res.status(201).json({createdNote, message: "Succesfully Created a new Note"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Note Creation was Unsuccesfull"})
    }
}

exports.getNotesByUser = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 20;
    let filtro = {
        userEmail: req.body.userEmail
    }
    try {
        var Notes = await NoteService.getNotes(filtro, page, limit)
        return res.status(200).json({status: 200, data: Notes, message: "Notes succesfully Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateNote = async function (req, res, next) {
    if (req.body.email == null) {
        return res.status(400).json({status: 400., message: "The user's email should be present on the http request Body."})
    }
    var Note = {
        title: req.body.title != null ? req.body.title : null,
        body: req.body.body != null ? req.body.body : null
    }
    try {
        var updatedNote = await NoteService.updateNote(Note)
        return res.status(200).json({status: 200, data: updatedNote, message: "Note succesfully Updated"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeNote = async function (req, res, next) {
    var date = req.body.date;
    try {
        var deleted = await NoteService.deleteNote(date);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}