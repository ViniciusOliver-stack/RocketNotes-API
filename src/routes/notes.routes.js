const {Router} = require('express')

const notesRoutes = Router()//Vamos executar o Router

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

//Vamos importar as nossas notas Controller
const NotesController = require('../controllers/NotesController')

notesRoutes.use(ensureAuthenticated)

const notesController = new NotesController()
notesRoutes.get("/", notesController.index)
notesRoutes.post("/" , notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)

//Estou exportando esse arquivo para quem quiser utilizar 
module.exports = notesRoutes