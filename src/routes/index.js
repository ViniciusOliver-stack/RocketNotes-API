const { Router } = require('express')

const userRouter = require('./users.routes')
const noteRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')

const routes = Router()

routes.use('/users', userRouter)
routes.use('/notes', noteRouter)
routes.use('/tags', tagsRouter)

module.exports = routes