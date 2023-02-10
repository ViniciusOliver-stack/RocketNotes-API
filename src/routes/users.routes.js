const {Router} = require('express')

const usersRoutes = Router()//Vamos executar o Router

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

usersRoutes.post("/" ,usersController.create)
usersRoutes.put("/:id", usersController.update)

//Estou exportando esse arquivo para quem quiser utilizar 
module.exports = usersRoutes