// Gettign the Newly created Mongoose Model we just created 
var Note = require('../models/Note.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.createNote = async function (note) {
    var id = selectValidId(note.body)
    var newNote = new Note({
        title: note.title,
        body: note.body,
        creationDate: note.date,
        id: id
    })

    try {
        var savedNote = await newNote.save();
    } catch (e) {
        console.log(e)    
        throw Error("Error while saving the note")
    }
}

exports.selectValidId = function (body) {
    var isAvailable = false
    var availableID = ""

    while (isAvailable == true) {
        var newID = bcrypt.hashSync(body, 8);
        var note = await Note.findOne(newID);
        if (note == null) {
            isAvailable = true
            availableID = newID
        }
    }
    return availableID
}

exports.getNotes = async function (query, page, limit) {
    var options = {
        page,
        limit
    }
    try {
        var Notes = await Note.paginate(query, options)
        return Notes;
    } catch (e) {
        throw Error('Error while Paginating Notes');
    }
}

exports.updateNote = async function (note) {
    var id = {id :note.id}
    try {
        var oldNote = await Note.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Note")
    }
    if (oldNote == null) {
        return false;
    }

    if (note.email != "null") {
        oldNote.email = note.email
    }
    if (note.name != "null") {
        oldNote.name = note.name
    }

    try {
        var savedNote = await oldNote.save()
        return savedNote;
    } catch (e) {
        throw Error("And Error occured while updating the Note");
    }
}

exports.deleteNote = async function (id) {
    try {
        var searchID = {id: id}
        var note = await Note.findOne(searchID);
        var deleted = await Note.remove({
            id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("The desire Note could not be deleted")
        }
        return note;
    } catch (e) {
        throw Error("Error Occured while Deleting the Note")
    }
}