require('express-async-errors')
const express = require('express')
const AppError = require('./utils/AppError')
const routes = require('./routes')
const migrationsRun = require('./database/sqlite/migrations') // Aqui alteramos para migrations
const cors = require('cors')
const uploadConfig = require('./configs/upload')

const app = express()
app.use(express.json())

migrationsRun() 

app.use(routes)

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(cors())

app.use(( error, request, response, next ) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
 