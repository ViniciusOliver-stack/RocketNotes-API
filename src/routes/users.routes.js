const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const upload = multer(uploadConfig.MULTER)

const usersRoutes = Router() //Vamos executar o Router

const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()


usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

//Estou exportando esse arquivo para quem quiser utilizar
module.exports = usersRoutes
