const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const upload = multer(uploadConfig.MULTER)

const usersRoutes = Router() //Vamos executar o Router

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    console.log(request.file.filename)
    response.json()
  }
)

//Estou exportando esse arquivo para quem quiser utilizar
module.exports = usersRoutes
