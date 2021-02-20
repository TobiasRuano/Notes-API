var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.post('/registration', UserController.createUser);
router.post('/login/', UserController.loginUser);
router.put('/updateuser', Authorization, UserController.updateUser);
router.post('/remove', Authorization, UserController.removeUser);

// Export the Router
module.exports = router;