var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var NoteSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: Date,
    userEmail: String,
    id: String
})

NoteSchema.plugin(mongoosePaginate)
const Note = mongoose.model('Note', NoteSchema)

module.exports = Note;