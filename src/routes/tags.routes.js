const {Router} = require('express')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const tagsRoutes = Router()//Vamos executar o Router
//Vamos importar as nossas notas Controller
const TagsController = require('../controllers/TagsController')

const tagsController = new TagsController()
tagsRoutes.get("/", ensureAuthenticated, tagsController.index)

//Estou exportando esse arquivo para quem quiser utilizar 
module.exports = tagsRoutes