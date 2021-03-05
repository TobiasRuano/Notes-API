/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var notes = require('./api/note.route')

router.use('/users', users);
router.use('/notes', notes);

module.exports = router;
