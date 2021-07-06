const express = require('express');
const userController = require('../controllers/user.controller');
const noteController = require('../controllers/note.controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.patch('/update', checkAuth.checkAuth, userController.updateUser);

router.post('/getnotes', checkAuth.checkAuth, noteController.createNote);

module.exports = router;