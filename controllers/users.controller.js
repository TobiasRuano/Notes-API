var UserService = require('../services/user.service');
var MailController = require('../controllers/mail.controller');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.createUser = async function (req, res, next) {
    var User = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
    }
    try {
        var token = await UserService.createUser(User)
        let data = {
            destinatario: User.email,
            asunto: "Account succesfully created!",
            cuerpo: "Thanks for being with us!"
        }
        MailController.sendEmail(data)
        return res.status(200).json({token: token, message: "Succesfully Created User"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function (req, res, next) {
    if (req.body.dni == null) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }
    var User = {
        name: req.body.nombre != null ? req.body.nombre : null,
        email: req.body.email != null ? req.body.email : null
    }
    try {
        var updatedUser = await UserService.updateUser(User)
        let data = {
            destinatario: User.email,
            asunto: "Usuario Actualizado correctamente",
            cuerpo: "Algunos de tus datos fueron actualizados. Si no fue usted, cambie la contrasena inmediatamente!"
        }
        MailController.sendEmail(data)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function (req, res, next) {

    var dni = req.body.dni;
    try {
        var deleted = await UserService.deleteUser(dni);
        let data = {
            destinatario: deleted.email,
            asunto: "Usuario eliminado correctamente",
            cuerpo: "Lamentamos verte partir. Hasta la proxima!"
        }
        MailController.sendEmail(data)
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("body",req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        return res.status(200).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

    
    
