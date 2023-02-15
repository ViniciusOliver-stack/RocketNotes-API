const {Router} = require('express')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRoutes = Router()//Vamos executar o Router

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

usersRoutes.post("/" ,usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)

//Estou exportando esse arquivo para quem quiser utilizar 
module.exports = usersRoutes