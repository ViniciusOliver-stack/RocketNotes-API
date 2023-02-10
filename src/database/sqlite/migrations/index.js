const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsRun(){
  const schemas = [
    createUsers
  ].join('')

  sqliteConnection() //Vamos chamar o nosso sqliteConnection
  .then(db => db.exec(schemas)) //Iremos executar as nossas schemas que será as nossas migrations
  .catch(error => console.error(error))
}

module.exports = migrationsRun