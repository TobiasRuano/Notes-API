var express = require('express')
var router = express.Router()
var NoteController = require('../../controllers/notes.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.post('/createnote', Authorization,  NoteController.createNote);
router.post('/updatenote', Authorization,  NoteController.updateNote);
router.post('/getnotes', Authorization, NoteController.getNotesByUser);
router.post('/remove', Authorization, NoteController.removeNote);

// Export the Router
module.exports = router;