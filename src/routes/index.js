const { Router } = require('express')

const userRouter = require('./users.routes')
const noteRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()

/*Resolve erro CORS ACCESS-CONTROL-ALLOW */
routes.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes.use('/users', userRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/notes', noteRouter)
routes.use('/tags', tagsRouter)

module.exports = routes