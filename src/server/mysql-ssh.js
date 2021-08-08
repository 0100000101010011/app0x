const mysql = require('mysql2')
const Client = require('ssh2').Client
const ssh = new Client()

//import database configuration file with connection credentials
const config = require('../server/config')

//package the connection to the db variable
const db = new Promise((resolve, reject) => {
  //ssh shell into the server/vm
  ssh
    .on('ready', () => {
      //connect to mysql
      ssh.forwardOut(
        '',
        '',
        config.mysql.host,
        config.mysql.port,
        (err, stream) => {
          if (err) throw err // SSH error: can also send error in promise ex. reject(err)

          //connect to database
          let connection = mysql.createConnection({
            user: config.database.user,
            password: config.database.password,
            database: config.database.name,
            stream: stream,
          })

          // send connection back in variable depending on success or not
          connection.connect((err) => {
            //now we use connection() whenever we want to query the database
            return !err ? resolve(connection) : reject(err)
          })
        }
      )
    })
    .connect({
      //connect to physical or vm server
      host: config.server.host,
      port: config.server.port,
      username: config.server.user,
      password: config.server.password,
    })
})

//db module ready for import and use
module.exports = db
