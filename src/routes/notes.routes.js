const {Router} = require('express')

const notesRoutes = Router()//Vamos executar o Router
//Vamos importar as nossas notas Controller
const NotesController = require('../controllers/NotesController')

const notesController = new NotesController()
notesRoutes.get("/", notesController.index)
notesRoutes.post("/:user_id" , notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)

//Estou exportando esse arquivo para quem quiser utilizar 
module.exports = notesRoutes