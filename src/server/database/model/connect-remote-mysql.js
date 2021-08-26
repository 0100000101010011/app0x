const Client = require('ssh2').Client;
const mysql = require('mysql2');
const ssh = new Client();

// connects to a remote virtual machine hosting the mysql database, running on-prem on the network
// in this case it connects to the NUC virtualization server that's running a virtual machine with MySQL
/*
 *
 * Connects to remote virtual machine: server-mysql
 */

// import database config file with connection credentials
const config = require('../../config');

// package the connection to the db variable
const db = new Promise((resolve, reject) => {
  // ssh shell into the virtual server (vm)
  ssh
    .on('ready', () => {
      // connect to mysql
      ssh.forwardOut(
        '',
        '',
        config.mysql.host,
        config.mysql.port,
        (err, stream) => {
          // console.log('ForwardOut time');
          if (err) throw err; // SSH error: can also send error in promise ex. reject(err)

          // this is a duplicate of above, refactor
          if (err) {
            throw err;
          } else {
            console.log('VM Connected');
          }

          // connect to database
          let connection = mysql.createConnection({
            user: config.database.user,
            password: config.database.password,
            database: config.database.name,
            stream: stream,
          });

          // send connection back in variable depending on success or not
          connection.connect((err) => {
            // console.log(connection.status);
            if (connection.state === 'disconnected') {
              console.log('disconnected');
              return respond(null, { status: 'fail', message: 'server down' });
            } else {
              console.log('Database Connected');
            }

            // now we use connection() whenever we want to query the database
            // console.log(reject(err) + ' ' + resolve(connection));
            return !err ? resolve(connection) : reject(err);
          });
        }
      );
    })
    .connect({
      // connect to physical or vm server
      host: config.server.host,
      port: config.server.port,
      username: config.server.user,
      password: config.server.password,
    });
});

// db module ready for import and use
module.exports = db;
